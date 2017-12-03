const BANK = [
    [{
        question: 'What does <code>Number(undefined)</code> return?',
        topic: 'JavaScript',
        answers: [
            { key: 0, answer: '<code>NaN</code>' },
            { key: 1, answer: '<code>undefined</code>' },
            { key: 2, answer: '<code>0</code>' }, 
            { key: 3, answer: '<code>error: illegal operation</code>' }
        ]
    }], 
    [{
        question: 'What does <code>typeof null</code> return?',
        topic: 'JavaScript',
        answers: [
            { key: 0, answer: '<code>object</code>' },
            { key: 1, answer: '<code>symbol</code>' },
            { key: 2, answer: '<code>boolean</code>' }, 
            { key: 3, answer: '<code>undefined</code>' }
        ]
    }],
    [{
        question: 'Which of the following is <strong>true</strong> about <code>const</code>?',
        topic: 'JavaScript',
        answers: [
            { key: 0, answer: 'The value of a <code>const</code> cannot change through re-assignment.' },
            { key: 1, answer: 'A <code>const</code> can be redeclared.' },
            { key: 2, answer: 'It can only hold integer values.' }, 
            { key: 3, answer: 'The value of a <code>const</code> is immutable.' }
        ]
    }],
    [{
        question: 'Which of the following is <strong>true</strong> about <code>let</code>?',
        topic: 'JavaScript',
        answers: [
            { key: 0, answer: 'It declares a block scope local variable.' },
            { key: 1, answer: 'It declares a function.' },
            { key: 2, answer: 'It declares a global scope variable.' }, 
            { key: 3, answer: 'Variables declared with <code>let</code> are hoisted.' }
        ]
    }],
    [{
        question: 'Which of the following is <strong>true</strong> about <code>null</code> in JavaScript?',
        topic: 'JavaScript',
        answers: [
            { key: 0, answer: '<code>null</code> is a primitive type in JavaScript.' },
            { key: 1, answer: '<code>null</code> indicates that a variable has been declared but has not yet been assigned a value' },
            { key: 2, answer: '<code>null</code> cannot be assigned to a variable.' }, 
            { key: 3, answer: 'An uninitialized variable is automatically assigned a value of <code>null</code>.' }
        ]
    }],
    [{
        question: '<code>rm index.html</code> on the command line...',
        topic: 'Linux',
        answers: [
            { key: 0, answer: 'Removes <code>index.html</code> file from the current working directory, if it exists.' },
            { key: 1, answer: 'Changes the current working directory to <code>index.html</code>, if it exists.' },
            { key: 2, answer: 'Creates a new directory named <code>index.html</code>.' }, 
            { key: 3, answer: 'Deletes the current working directory.' }
        ]
    }],
    [{
        question: '<code>pwd</code> on the command line...',
        topic: 'Linux',
        answers: [
            { key: 0, answer: 'Prints the current working directory.' },
            { key: 1, answer: 'Changes the current working directory.' },
            { key: 2, answer: 'Creates a new directory.' }, 
            { key: 3, answer: 'Deletes the current directory.' }
        ]
    }],
    [{
        question: '<code>cd</code> on the command line...',
        topic: 'Linux',
        answers: [
            { key: 0, answer: 'Changes the current working directory.' },
            { key: 1, answer: 'Prints the current working directory.' },
            { key: 2, answer: 'Creates a new directory.' }, 
            { key: 3, answer: 'Deletes the current directory.' }
        ]
    }],
    [{
        question: 'Which of the following statements about JavaScript functions is <strong>false</strong>?',
        topic: 'JavaScript',
        answers: [
            { key: 0, answer: 'JavaScript functions are not hoisted.' },
            { key: 1, answer: 'A function can accept other functions as arguments.' },
            { key: 2, answer: 'JavaScript functions can be anonymous.' }, 
            { key: 3, answer: 'A JavaScript function can be a property value in an object.' }
        ]
    }],
    [{
        question: 'A <code>@media</code> query...',
        topic: 'CSS',
        answers: [
            { key: 0, answer: 'Defines different style rules for different devices.' },
            { key: 1, answer: 'Represents a generic container for video and audio content.' },
            { key: 2, answer: 'Represents a generic container for embedded interactive content.' }, 
            { key: 3, answer: 'Renders vector graphics in a designated area of the viewport.' }
        ]
    }],
    [{
        question: 'An <code>ID</code> selector...',
        topic: 'CSS',
        answers: [
            { key: 0, answer: 'Is preceded by a <code>#</code> character and identifies a unique element.' },
            { key: 1, answer: 'Is preceded by a <code>.</code> character and identifies multiple elements.' },
            { key: 2, answer: 'Is preceded by a <code>#</code> character and identifies multiple elements.' }, 
            { key: 3, answer: 'Is preceded by a <code>.</code> character and identifies a unique element.' }
        ]
    }],
    [{
        question: 'What is a <code>&lt;head&gt;</code> element?',
        topic: 'HTML',
        answers: [
            { key: 0, answer: 'It provides metadata about the HTML document.' },
            { key: 1, answer: 'It creates a hyperlink to other web pages.' },
            { key: 2, answer: 'It represents introductory content such as navigation.' }, 
            { key: 3, answer: 'It is used to group several controls within a web form.' }
        ]
    }],
    [{
        question: 'In an HTML document, <code>!DOCTYPE html</code>...',
        topic: 'HTML',
        answers: [
            { key: 0, answer: 'Tells the browser how to render the document.' },
            { key: 1, answer: 'Represents the root or the top-level element.' },
            { key: 2, answer: 'Refers to the generic container for flow content.' }, 
            { key: 3, answer: 'Represents the document object.' }
        ]
    }],
    [{
        question: 'In the Document Object Model (DOM), <code>window</code> refers to...',
        topic: 'JavaScript',
        answers: [
            { key: 0, answer: 'The global object in a browser.' },
            { key: 1, answer: 'An element returned by the DOM API.' },
            { key: 2, answer: 'An area of a webpage visible to the user.' },
            { key: 3, answer: 'The generic container of display properties.' }
        ]
    }],
    [{
        question: 'In the Document Object Model (DOM), <code>document</code> refers to...',
        topic: 'JavaScript',
        answers: [
            { key: 0, answer: 'The main object of the rendered DOM.' },
            { key: 1, answer: 'The global object in a browser.' },
            { key: 2, answer: 'The area of a webpage visible to the user.' },
            { key: 3, answer: 'An array of nodes or elements.' }
        ]
    }],
    [{
        question: 'What is the correct order of event bubbling?',
        topic: 'JavaScript',
        answers: [
            { key: 0, answer: 'The element, its parent, then its other ancestors.' },
            { key: 1, answer: 'The element, then all its children.' },
            { key: 2, answer: 'The element, then all its siblings.' },
            { key: 3, answer: 'The element, then all other elements of the same class.' }
        ]
    }],
    [{
        question: 'Event delegation refers to...',
        topic: 'JavaScript',
        answers: [
            { key: 0, answer: 'An event listener that will fire for an element\'s descendents.' },
            { key: 1, answer: 'An event listener that will fire for an element\'s parents.' },
            { key: 2, answer: 'An event listener that will fire for an element\'s siblings.' },
            { key: 3, answer: 'The most deeply nested element that caused an event.' }
        ]
    }],
    [{
        question: 'In the box model, <code>padding</code> affects...',
        topic: 'CSS',
        answers: [
            { key: 0, answer: 'The space between the box and the border.' },
            { key: 1, answer: 'The space between the border and other content that interact with the box.' },
            { key: 2, answer: 'Font size in pixels.' },
            { key: 3, answer: 'Image quality in pixels.' }
        ]
    }],
    [{
        question: 'In the box model, <code>margin</code> affects...',
        topic: 'CSS',
        answers: [
            { key: 0, answer: 'The space between the border and other content that interact with the box.' },
            { key: 1, answer: 'The space between the box and the border.' },
            { key: 2, answer: 'The size of the viewport.' },
            { key: 3, answer: 'The size of the browser window.' }
        ]
    }],
    [{
        question: 'Which of the following is <strong>true</strong>?',
        topic: 'CSS',
        answers: [
            { key: 0, answer: 'Both <code>fixed</code> and <code>absolute</code> elements are positioned relative to the document rather than a parent.' },
            { key: 1, answer: 'A <code>fixed</code> element responds to its parent; an <code>absolute</code> element does not.' },
            { key: 2, answer: 'A <code>fixed</code> element responds to scrolling; an <code>absolute</code> element does not.' },
            { key: 3, answer: 'A <code>fixed</code> element follows document normal flow; an <code>absolute</code> element does not.' }
        ]
    }]
];