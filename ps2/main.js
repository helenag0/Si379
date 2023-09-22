const WORD_LENGTH = 5; // How long each guess should be
const inputEl = document.querySelector('#guess-inp'); // The input DOM element

// Will store the correct answer once fetched
let correctAnswer = '';

// Before we have a set answer, disable the input field and show a loading message
inputEl.setAttribute('disabled', true);
showInfoMessage('Loading...');

// Get a random answer from the list
getRandomAnswer((answer) => {
    correctAnswer = answer;              // Once we have it, store it, ...
    inputEl.removeAttribute('disabled'); // enable the input field, ...
    clearInfoMessage();                  // clear the loading message, and...
    inputEl.focus();                     // and focus the input field
    // NOTE : If you use Live Preview, the focus line ☝️ can get annoying because
    //       it will keep focusing the input field every time you edit the file.
    //       You can comment it out.
});

// TODO: Fill in your code here
// Step 1: Define a function displayGuessFeedback(guess) that takes a guess and displays it on the page.
function displayGuessFeedback(guess) {
    const newGuess = document.createElement('div');
    newGuess.classList.add('guess');
    
    for(let i = 0; i < guess.length; i++) {
        // For each letter in the guess, create a new <span> element with class 'letter'

        const letter = guess[i].toUpperCase();
        const correctLetter = correctAnswer[i].toUpperCase();
        const currSpan = document.createElement('span');
        currSpan.classList.add('letter');

        if(letter === correctLetter) {
                //      2.a. If the letter is in the correct position, add the (additional) class 'correct' to the <span> element
            currSpan.classList.add('correct');
        } 
        else if(correctAnswer.toUpperCase().includes(letter)) {
                //      2.b. If the letter is in the answer but not in the correct position, add the (additional) class 'present' to the <span> element
            currSpan.classList.add('present');
        } 
        else {
                //      2.c. If the letter is not in the answer, add the (additional) class 'absent' to the <span> element
                // ...
            currSpan.classList.add('absent');
        }
        currSpan.innerText = letter;
        newGuess.appendChild(currSpan);
        //      2.d. Set the text content of the <span> element to the letter
//      2.e. Append the <span> element to the guess's <div> element

    }
    // 3. Append the guess's <div> element to the existing <div> with ID 'guesses'
// 4. Try it out by calling displayGuessFeedback('hello') and displayGuessFeedback('world')
// 
    document.querySelector('#guesses').appendChild(newGuess);


}

// Step 2: Add an event listener to the input element that listens for the 'keydown' event.
inputEl.addEventListener('keydown', (ev) => {
    console.log(ev.code);
    if(ev.code === 'Enter') {
        const guess = inputEl.value;
        if(guess.length != WORD_LENGTH) {
            showInfoMessage("Your guess must be " + WORD_LENGTH + " letters long.");
        }
        else if(guess === correctAnswer) {
            showInfoMessage("You win! The answer was " + correctAnswer + ".");
            inputEl.setAttribute('disabled', true);
        }
        else {
            inputEl.value = "";
            if(isValidWord(guess) === true) {
                displayGuessFeedback(guess);
            }
            else {
                showInfoMessage(guess + " is not a valid word.");
            }
        }
    }
    else {
        clearInfoMessage();
    }

});
// 1. When the user presses the 'Enter' key, the event listener should:
//     1.a. Get the value of the input element (which is the guess)
//     1.b. If the guess is not the correct length (WORD_LENGTH), use showInfoMessage to display: "Your guess must be {WORD_LENGTH} letters long." (where {WORD_LENGTH} is the value of WORD_LENGTH)
//     1.c. If the guess is the correct answer, use showInfoMessage to display: "You win! The answer was "{correctAnswer}". (where {correctAnswer} is the value of correctAnswer)
//          1.c.i. If the guess is correct, also disable the input element so the user can't enter any more guesses (the game is over)
//     1.d. If the guess is not the correct answer, then:...
//          1.d.i. Clear the input element's value
//          1.d.ii. Check if the guess is a valid word (using the isValidWord function)
//              1.d.ii.A If the guess is a valid word, display feedback for the guess (using the displayGuessFeedback function from Step 1)
//              1.d.ii.B If the guess is not a valid word, show an error message: "{guess} is not a valid word." (where {guess} is the value of the guess)
// 2. When the user presses key other than 'Enter', clear the info message (using the clearInfoMessage function)