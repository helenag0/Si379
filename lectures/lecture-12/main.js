const timeDisplay = document.querySelector('#time-display'); // Displays the time
const startButton = document.querySelector('#start-button'); // Starts the timer
const pauseButton = document.querySelector('#pause-button'); // Pauses the timer
const resetButton = document.querySelector('#reset-button'); // Resets the timer

let elapsedTime = 0; // Time that has elapsed since the last time we paused the timer
let startedTime; // Timestamp when we started the timer
let updateInterval; // ID of the interval that updates the time display

/**
 * Update the content in the #time-display element to reflect the current time
 * @param {*} value Time in milliseconds
 */

// Step 1 Display and update the current timestamp
function updateDisplay(value) {
    timeDisplay.innerText = (value/1000).toFixed(2);
}

// Step 2 Display (and update) the number of seconds since loading the page
function currentTime() {
    const currentRunTime = Date.now() - startedTime; // Time since we last clicked "start"
    const totalTime = elapsedTime + currentRunTime; // Time since clicking "start" plus the time elapsed since the last time we clicked "pause"
    updateDisplay(totalTime); // Update the DOM to reflect this time
}

// Step 3 Display (and update) the number of seconds since pressing the "start" button
function startButtonPush() {
    updateDisplay(Date.now() - startedTime);
}

// Step 4  Disable the "start" button when it is clicked
function disableStart() {
    startButton.setAttribute('disabled', true);
}

// Step 5  Make the "reset" button stop and reset the timer
// Step 6  Make the "pause" button pause the timer (and re-enable the "start" button)
// // When the "start" button is clicked, the "pause" button should be disabled
// Step 7  (optional): Add more precision to the timer
// Update the updateDisplay() function to set timeDisplay.innerText = (value/1000).toFixed(2);