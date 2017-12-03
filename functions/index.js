'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const request = require('request-promise');

// List of output languages.
const LANGUAGES = ['en', 'es', 'de', 'fr', 'sv', 'ga', 'it', 'jp'];

// Translate an incoming message.
exports.translate = functions.database.ref('/{questionID}').onWrite(event => {
  const snapshot = event.data;
  if (snapshot.val().translation) { 
    return null;
  }
  const questionText = snapshot.val().question;
  const answerText = snapshot.val().answers;

  const promises = [];
  for (let i = 0; i < LANGUAGES.length; i++) {
    var language = LANGUAGES[i];
    if (language !== 'en') {
      promises.push(createTranslationPromise('en', language, snapshot.key, questionText, 'question'));
      for (let j = 0; j < 4; j++) {
        promises.push(createTranslationPromise('en', language, snapshot.key, answerText[j].answer, `answer/${j}`))
      }
    }
  }
  return Promise.all(promises);
});

// URL to the Google Translate API.
function createTranslateUrl(source, target, payload) {
  return `https://www.googleapis.com/language/translate/v2?key=${functions.config().firebase.apiKey}&source=${source}&target=${target}&q=${payload}`;
}

function createTranslationPromise(source, target, key, message, field) {
    console.log(`createTranslationPromises() called, mesage = ${message}`);
    return request(createTranslateUrl(source, target, message), {resolveWithFullResponse: true}).then(
      response => {
        if (response.statusCode === 200) {
          const data = JSON.parse(response.body).data;
          return admin.database().ref(`/${key}/translation/${target}/${field}`)
              .set(data.translations[0].translatedText);
        }
        throw response.body;
      });
}