// shuffle content of array
function shuffle(arr) {
    console.log(`shuffle() was called`);  
    var currentIndex = arr.length, 
        temporaryValue, 
        randomIndex ;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }
    return arr;
}

// take array of objects and an indicator, return naked array of keys or properties
function nakedValues(arrayOfObjects, zeroOrOne) { // if 0 return keys, if 1 return properties
  if(zeroOrOne === 1) {
      console.log(`nakedValues() was called`);
      let answers = []
      for(let i=0; i<arrayOfObjects.length; i++) {
        answers.push(arrayOfObjects[i].answer)
      }
      return answers;
  } else {
    return arrayOfObjects
  }
}

function getOriginalIndex(value) { // get pre-shuffle index for checking answer correctness
    console.log(`getOriginalIndex() was called`);
    let originalIndex = _.findIndex(BANK[STATE.currentQ].answers, function(o) {
      return o.answer == value; 
    });
    return originalIndex;
}

function gif(state) { // get GIF for feedback
    console.log("`gif()` was called");
    let happyGifs = [
        './gifs/happy/happy-catpaws.gif', './gifs/happy/happy-feet.gif', './gifs/happy/happy-golden.gif', './gifs/happy/happy-lab.gif', './gifs/happy/happy-pup.gif','./gifs/happy/happy-shiba.gif', './gifs/happy/happy-pug.gif', './gifs/happy/happy-tiny-dog.gif'
    ]; 
    let sadGifs = [
        './gifs/sad/sad-cat.gif', './gifs/sad/sad-creature.gif', './gifs/sad/sad-fluff.gif', './gifs/sad/sad-nope-cat.gif', './gifs/sad/sad-pup-sleep.gif', './gifs/sad/sad-pup.gif'
    ];
    if (STATE.currentAnswerCorrect) {
        return shuffle(happyGifs)[0]; 
    } else {
        return shuffle(sadGifs)[0];
    }
}

function getImgURL(str) { // takes filename as input and returns full image URL
    console.log(`getImgURL() was called`)
    let root = `https://github.com/elainechan/webdev/blob/master/quiz/`;
    let file = str.replace(/^[.(?=/)]/, root); // replace dot with url root
    let url = file.concat(`?raw=true`); // concat url with retrieve code
    return url;
}

