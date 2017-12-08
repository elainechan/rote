![Logo](https://github.com/elainechan/rote/blob/master/logos/Rote-logo.png?raw=true)
<div align="center">
<p>
<em>Logo designed by <a href="https://github.com/Reyesjunk">@Reyesjunk</a></em>
</p>
</div>

<div align="center">
<h1><a href="https://elainechan.github.io/rote/">Give it a go</a></h1>
</div>
<br>
<br>

## Developers
In alphabetical order:
* [Moyouri Bhattacharjee](https://github.com/Moyourib)
* [Elaine Chan](https://github.com/elainechan)
* [Jennifer Joo](https://github.com/Corvids)
* [Ramon Reyes](https://github.com/Reyesjunk)

## Topics Covered
* [x] HTML
* [x] CSS
* [x] JavaScript
* [x] Linux
* [ ] Network Protocols
* [ ] React
* [ ] Node
* [ ] Debugging
* [ ] Testing (`assert`, `expect`, etc)
* [ ] Web Tooling (Webpack, Babel, browser debuggers...)
* [ ] Database (SQL, NoSQL, Mongo, etc...)
* [ ] Computer Systems (Bits and bytes)
* [ ] Devops (Terminology, tools, processes...)
* [ ] Data Structures (Linked lists, trees, heaps, queues, stacks...)
* [ ] Algorithms (Searching, sorting...)
* [ ] Design Patterns (MVC, Singleton, Factory, Decorator...)

## Design

### Build
* Frontend: React components by [@Moyourib](https://github.com/Moyourib), [@Reyesjunk](https://github.com/Reyesjunk) 
* Database: [Firebase Realtime Database](https://firebase.google.com/docs/database/) by [@Corvids](https://github.com/Corvids)
* Translation: [Google Cloud Translation](https://cloud.google.com/translate/) with [Firebase Cloud Functions](https://firebase.google.com/docs/functions/) by [@elainechan](https://github.com/elainechan)
* Based on [Web Developer Interview Quiz](https://github.com/elainechan/webdev/tree/master/quiz)

### Requirements
* See [requirements.md](./requirements.md).

### Displays
* Start page
* Question content: randomized questions and answer choices in each cycle
* Translate: option to translate questions and answers to another language
* Feedback: number of questions right, number wrong, number remaining
* Overall result

### Pattern: Model-View-Controller
* _Model_: `BANK` (immutable), `STATE` (mutable)
* _View_: `render`, `generate`
* _Controller_: `update`, `setHandle`
* Separation of concerns:
    * `BANK` _Model_ is never mutated
    * `render` _View_
        * calls `setHandler` to display button
        * does not trigger `setHandler` to mutate `STATE` _Model_
    * `setHandle` _Controller_ 
        * mutates `STATE` _Model_ when triggered by click events
        * does not call `render` to change _View_
    * `update` _Controller_ 
        * calls `render` to change _View_
        * does not mutate `STATE` _Model_

### Files
* HTML wireframe: `index.html`
* Main styles and layout: `main.css`
* Main program: `main.js`
* Helper functions for manipulating data and loading assets: `helpers.js`
* Question content: `questions.json` (serverless version), `question-bank.js` (static version) 

### Theme
* Color Scheme: [grayscale](http://www.color-hex.com/color-palette/4246), [Web-safe grayscale](http://www.color-hex.com/color-palette/3046)
* Font: [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono)


## Enhancement

### User Stories
(Listed by estimated difficulty)
1. Level 1: Content selection (easy)
    - Users should be able to:
    - [ ] choose one or more topic(s)
    - [ ] choose the number of questions they have to answer.
    - [ ] choose difficulty level
    - [x] choose to display questions and answers in another language

2. Level 2 Authentication, CRUD (medium)
    - Users should be able to:
    - [ ] sign up for an account
    - [ ] log in and log out
    - [ ] use app as guest
    - [ ] create and save custom quizzes based on topic(s) and number of questions.
    - [ ] review results from quizzes they had taken in the past. 
    - Requirements:
    - [ ] Each time a quiz is taken, quiz data, user selections, and results are saved and stored in database.
    - [ ] If user chooses to sign up for an account, their history will be made available.
    - [ ] This requires management of session ID (to identify session), user IP address (to identify user).

3. Level 3: Analytics (hard)
    - Users should be able to:
    - [ ] See performance history
    - [ ] Zoom in to narrow results by date, by topic, by difficulty
    - [ ] Access analysis of performance history
    - Requirements:
    - [ ] Organize data store by date, by topic, by difficulty
    - [ ] Models for analyzing performance data

### Add Backend
* [ ] Server
* [x] JSON data structure ([example](./questions.json))
* [x] Database
* [ ] Get/request APIs

### Add Features
* [x] Selection menu
    * [ ] Option to select quiz size (number of questions)
    * [ ] Option to select topic area
    * [ ] Option to select difficulty
    * [x] Option to select language
    * [ ] Access reference material
    * [ ] Access analytics
* [ ] Feedback enhancement
    * [ ] Display answer explanations
    * [ ] Display reference links
* [ ] Review page
    * [ ] Display answer explanations
    * [ ] Display answer history
* [ ] Analytics feature
    * [ ] Overall answer history
    * [ ] Performance by date
    * [ ] Performance by topic
* [ ] Search engine
    * [ ] by keyword
    * [ ] by date

### Improve Design
* [ ] Grid system
* [ ] Style guide
* [x] Navigation menu [example](https://codepen.io/philhoyt/pen/ujHzd)
    * [x] Drop down
    * [ ] Tabs

### App Refactor
* [ ] Add `START` and `END` states
    * [ ] In `START` state:
```javascript
function initialize() {
    // only called once
    // initialize static elements, some hidden
    // add to updateView()
    setHandleNextButton();
}
$(initialize); // call on first run
```
 * [ ] (Optional) Preload
    - [ ] Preload all HTML elements at startup
    - [ ] Hide and show elements through use cycle according to `STATE`
* [ ] Function to crop image
    - [ ] associate image filename to cropping data
    - [ ] array of filenames
    - [ ] key value pairs (img: dimension)
```javascript
function cropGif() {
    /*
    use AJAX to get JSON containing cropping information
    fetch image URL
    apply cropping
        size: a bounding box starting top left corner, ending bottom right corner
        calculate height and width
        set cropping container to height and width in pixels
        set cropping container `top, left`
        CSS
            position: absolute
            use negative values to hide part of image
    */
}
```

## Reference

### Web Standards Reference
* Progressive Web Apps
    - [Tutorial (Eric Elliot)](https://medium.com/javascript-scene/native-apps-are-doomed-ac397148a2c0)
* Web App Manifest
    - [Tutorial (Sam Thorogood, Google)](https://medium.com/dev-channel/how-to-add-a-web-app-manifest-and-mobile-proof-your-site-450e6e485638)
    - [W3C Documentation](https://www.w3.org/TR/appmanifest/)

### Design
* [Color Hex Color Codes](http://www.color-hex.com/)

### Content Reference
* [Google Tech Dev Guide Foundations Path](https://techdevguide.withgoogle.com/paths/foundational/)
* [Coding Interview University repo by an Amazon engineer](https://github.com/jwasham/coding-interview-university)
* [Frontend interview question list](https://github.com/h5bp/Front-end-Developer-Interview-Questions)
* [FreeCodeCamp frontend interview guide](https://medium.freecodecamp.org/cracking-the-front-end-interview-9a34cd46237)
* [Frontend interview guide by David Shariff](http://davidshariff.com/blog/preparing-for-a-front-end-web-development-interview-in-2017/)

### App Reference
* Max Carlquist music quiz 
    - [Codepen](https://codepen.io/Tenkaklet/pen/QEpWPo?editors=1111)
    - [Repo](https://github.com/Tenkaklet/MusicQuiz/blob/master/index.html)
* [W3Schools Quizzes](https://www.w3schools.com/quiztest/quiztest.asp?Qtest=HTML)
* [Building a Simple Quiz (CSS-Tricks)](https://css-tricks.com/building-a-simple-quiz/)
* [Make a Simple Javascript Quiz (Sitepoint)](https://www.sitepoint.com/simple-javascript-quiz/)
