'use strict';
const database = firebase.database().ref()
let BANK

database.on('value', function(snapshot) {
  BANK = snapshot.val()
  console.log(BANK)
  $(updateView);
});

const STATE = {
    currentQ: -1, // -1 before program starts
    numRight: 0,
    numWrong: 0,
    displayMode: "QUESTION", // either QUESTION or FEEDBACK.
    currentAnswerCorrect: false,
};

function updateView() {
    if(STATE.currentQ === -1) {
        shuffle(BANK);
        renderStart();
    } else if(STATE.currentQ >= 0 && STATE.currentQ < BANK.length) { // steady state
        if(STATE.displayMode === "QUESTION") {
            renderQuestion(STATE);
            renderNav(STATE.displayMode);
        } else if(STATE.displayMode ==='TRANSLATE') {
            renderTranslatedQuestion(STATE)
            renderNav(STATE.displayMode)
        } else { // FEEDBACK mode
            renderFeedback(STATE);
            renderNav(STATE.displayMode);
        }
        renderStatus(STATE);
    } else {
        renderEnd();
    }
}

function renderStart() {
    console.log("`renderStart()` was called");
    let startImage = `./gifs/start/start.gif`
    $("main").html(`<section role="region" aria-labelledby="start-page" id="start-section">
    <h2 id="subhead">Welcome to your interview.</h2><p>We are looking for a junior developer with a master degree and the experience of a senior developer, at the salary of an intern.</p><div id="start-image-container"><img id="start-image" src=${startImage} alt="Mulder and Scully looking at the sky"></div>
</section>`);
    $("nav").html(generateStartButton());
    setHandleStartButton();
}

function generateStartButton() {
    console.log("`generateStartButton()` was called");
    let startButton = `<div class="button-container"><button id="start-button">Begin</button></div>`;
    return startButton;
}

function setHandleStartButton() {
    console.log("`setHandleStartButton()` was called");
    $("#start-button").click(event => { // button handler: Controller
        STATE.currentQ = 0;
        console.log(STATE);
        updateView();
    });
}

function renderQuestion(state) {
    console.log("`renderQuestion()` was called");
    $("main").html(generateQuestion(state.currentQ));
    $("#logo-container").append(generateTopicLogo(BANK[state.currentQ].topic)); // append logo
    $("#question-form > fieldset").append(generateAnswerChoices(state.currentQ)); // append choices
    $("#question-form").append(generateSubmitAnswerButton()); // append submit button
    $("#question-form").append(generateTranslaterButton()); // append translate button
    setHandleAnswerChecked();
    setHandleSubmitAnswer();
}

function renderTranslatedQuestion(state) {
    console.log("`renderQuestion()` was called");
    $("main").html(translateQuestion(state.currentQ));
    $("#logo-container").append(generateTopicLogo(BANK[state.currentQ].topic)); // append logo
    $("#question-form > fieldset").append(generateAnswerChoices(state.currentQ)); // append choices
    $("#question-form").append(generateSubmitAnswerButton()); // append submit button
    $("#question-form").append(generateTranslaterButton()); // append translate button
    setHandleAnswerChecked();
    setHandleSubmitAnswer();
}


function generateQuestion(questionIndex) {
    console.log("`generateQuestion()` was called");
    let currentQuestion = BANK[questionIndex];
    let questionStatement = `${currentQuestion.question}`;
    let questionForm = `<section role="region" aria-labelledby="question" id="question-section">
    <div class="row">
    <div class="col" id="logo-container">
    </div><!--col-->
    <div class="col" id="question-container"><form aria-labelledby="question" id="question-form">
    <h3 id="question-number">
    Question ${questionIndex + 1} of ${BANK.length}
    </h3>
    <fieldset id="question-content"><legend id="question-statement">${questionStatement}</legend></fieldset></form>
    </div><!--col-->
    </div><!--row-->
    </section>`;
    return questionForm;
}

function translateQuestion(questionIndex) {
    console.log("`translateQuestion()` was called");
    let randomLanguage = ['de', 'es', 'fr', 'ga', 'it', 'sv']
    var index = Math.floor(Math.random() * randomLanguage.length);
    var language = randomLanguage[index]
    console.log(BANK[questionIndex].translation[language])
    let currentQuestion = BANK[questionIndex].translation[language];
    let questionStatement = `${currentQuestion.question}`;
    let questionForm = `<section role="region" aria-labelledby="question" id="question-section">
    <div class="row">
    <div class="col" id="logo-container">
    </div><!--col-->
    <div class="col" id="question-container"><form aria-labelledby="question" id="question-form">
    <h3 id="question-number">
    Question ${questionIndex + 1} of ${BANK.length}
    </h3>
    <fieldset id="question-content"><legend id="question-statement">${questionStatement}</legend></fieldset></form>
    </div><!--col-->
    </div><!--row-->
    </section>`;
    return questionForm;
}

function generateAnswerChoices(questionIndex) {
    console.log("`generateAnswerChoices()` was called");
    let answers = nakedValues(BANK[STATE.currentQ].answers, 1);
    let shuffledAnswers = shuffle(answers); // array
    let answerChoices = shuffledAnswers.map( (answer, index) => {
        let answerChoice = `<div class="answer-choice"><input type="radio" name="answer-checkbox" class="answer-checkbox" id=${getOriginalIndex(answer)}><label for="answer${getOriginalIndex(answer)}" class="answer-text">${answer}</label></div>`;
        return answerChoice;
    });
    return answerChoices;
}

function generateTopicLogo(topic) {
    let logo = `<img id="topic-logo" src="./logos/${topic}-logo.png" alt="${topic} logo">`;
    return logo;
}

function setHandleAnswerChecked() { // setting up handling of answer checkmark
    console.log("`setHandleAnswerChecked` was called")
    $(".answer-checkbox").change(event => {
        $("#submit-answer").attr("disabled", false); // enables submit answer button
    });
}

function generateSubmitAnswerButton() { // initially disabled
    console.log("`generateSubmitAnswerButton()` was called");
    let answerButton = `<button type="submit" id="submit-answer" disabled>Submit</button>`;
    return answerButton;
}

function generateTranslaterButton() {
    console.log("`generateTranslaterButton()` was called");
    let translateButton = `<button id="translate-answer">Translate</button>`;
    return translateButton;
}

function setHandleSubmitAnswer() {
    console.log("`setHandleSubmitAnswer()` was called");
    $("#submit-answer").on("click", event => {
        event.preventDefault();
        let checkedID = $("input[name=answer-checkbox]:checked").attr("id");
        let chosenAnswer = $(`label[for=${checkedID}]`).text();
        if(checkedID === 0 || checkedID === '0') { // mutate STATE
            STATE.numRight += 1;
            STATE.currentAnswerCorrect = true;
        } else {
            STATE.numWrong += 1;
            STATE.currentAnswerCorrect = false;
        }
        STATE.displayMode = "FEEDBACK"; // mutate STATE
        updateView();
    });
    $("#translate-answer").on("click", event => {
        event.preventDefault();
        console.log('clicking on translate answer')
        STATE.displayMode = "TRANSLATE"
        updateView();
    });
}

function renderStatus(state) {
    console.log("`renderStatus()` was called");
    $("footer").html(generateStatus(STATE)).removeAttr("hidden");
}

function generateStatus(state) {
    console.log("`generateStatus() was called");
    // display status: x right, y wrong, z to go
    let html = `<p>${STATE.numRight} right, ${STATE.numWrong} wrong, ${BANK.length - STATE.currentQ} to go</p>`;
    return html;
}

function renderNav(displayMode) {
    console.log("`renderNav()` was called");
    if(displayMode === "FEEDBACK" && STATE.currentQ < BANK.length) { // adding < BANK.length fixed issue where after last question it still shows "1 to go"
        $("nav").html(generateNextButton()); // display "Next" button
        STATE.currentQ += 1; // mutate state for correct display info
    } else {
        $("nav").html("");
    }
    setHandleNextButton();
}

function setHandleNextButton() {
    console.log("`setHandleNextButton()` was called");
    $("#next-button").on("click", event => { // mutate STATE
        STATE.displayMode = "QUESTION";
        updateView();
    });
}

function generateNextButton() {
    console.log("`generatNextButton()` was called");
    let nextButton = `<button type="button" id="next-button">Next</button>`;
    return nextButton;
}

function renderFeedback(state) {
    console.log("`renderFeedback()` was called");
    let question = BANK[STATE.currentQ];
    if(STATE.currentAnswerCorrect) {
        $("main")
        .html(`<div class="col" id="feedback-container">
        <section role="region" aria-labelledby="feedback" id="feedback-section">
        <h3>Correct.</h3>
        <p>${question.question}</p><p>${question.answers[0].answer}</p>
        </section></div>
        <!--col-->`);
        $("main").prepend(`<div class="col" id="feedback-image-container">
        <img id="feecback-image" src="${gif(state)}" alt="Happy animal GIF">
        </div><!--col-->`); // add gif
    } else {
        $("main").html(`<div class="col" id="feedback-container"><section role="region" aria-labelledby="feedback" id="feedback-section"><h3>Wrong.</h3><p>${question.question}</p><p>${question.answers[0].answer}</p></section></div>`);
        $("main").prepend(`<div class="col" id="feedback-image-container"><img id="feedback-image" src="${gif(state)}" alt="Sad animal GIF"></div>`);
    }
}

function renderEnd() {
    console.log("`renderEnd()` was called");
    $("main").html(generateEnd());
    $("nav").html(generateRestartButton());
    $("footer").html(""); // remove status display
    setHandleRestartButton();
}

function generateEnd() {
    console.log("`gnerateEnd()` was called");
    let message;
    let adjective;
    let image;
    let alt;
    if(STATE.numRight >= STATE.numWrong) { // works for both odd and even num of questions
        if(STATE.numRight/BANK.length > 0.75) {
            adjective = `<em>so</em>`;
        } else {
            adjective = `<em>barely</em>`;
        }
        image = `./gifs/end/hire.gif`;
        alt = `Michael and Pam from The Office having a celebration dance`;
        message = `Congratulations, you are ${adjective} hired!`;
    } else {
        image = `./gifs/end/no-hire.gif`;
        alt = `Dr. Who crying in the rain`;
        message = `<h2 id="subhead">Sorry, you didn't get the job.</h2><p>Please join our internship program in which you will be paid only in stock options and Starbucks giftcards. Or keep interviewing.</p>`;
    }
    let end = `<section role="region" aria-labelledby="end-page" id="end-section">${message}<h3>Your score is: ${STATE.numRight} out of ${BANK.length}</h3><div id="end-image-container"><img id="end-image" src=${image} alt="${alt}"></div></section>`;
    return end;
}

function generateRestartButton() {
    console.log("`generateRestartButton()` was called");
    let restartButton = `<div class="button-container"><button type="button" id="restart-button">Start Over</button></div>`
    return restartButton;
}

function setHandleRestartButton() {
    console.log("`setHandleRestartButton()` was called")
    $("#restart-button").on("click", event => { // button handler: Controller
        STATE.currentQ = -1;
        STATE.numRight = 0;
        STATE.numWrong = 0;
        console.log(STATE);
        updateView();
    });
}
