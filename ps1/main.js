let score = 0;
const curr_score = document.querySelector('#score');
let interval;

for(const id of getAllHoleIds()) {

    const hole = document.querySelector('#' + id);

    hole.addEventListener("click", () => {
        console.log("clicked");
        if(hole.classList.contains("needs-whack")) {

            hole.classList.remove("needs-whack");
            hole.classList.add("animating-whack");
            setTimeout(() => hole.classList.remove("animating-whack"), 500);
            score++;
            curr_score.innerHTML = 'Score: ' + score;

            if(score >= 45) {
                clearInterval(interval);
            }
        }
         
    });
    
}

// Write code that *every second*, picks a random unwhacked hole (use getRandomUnwhackedHoleId)
// and adds the "needs-whack" class
interval = setInterval(() => {
    let id = '#' + getRandomUnwhackedHoleId();
    document.querySelector(id).classList.add("needs-whack");
    
}, 1000);

/**
 * @returns a random ID of a hole that is "idle" (doesn't currently contain a mole/buckeye). If there are none, returns null
 */
function getRandomUnwhackedHoleId() {
    const inactiveHoles = document.querySelectorAll('.hole:not(.needs-whack)');  // Selects elements that have class "hole" 

    if(inactiveHoles.length === 0) {
        return null;
    } else {
        const randomIndex = Math.floor(Math.random() * inactiveHoles.length);
        return inactiveHoles[randomIndex].getAttribute('id');
    }
}

/**
 * @returns a list of IDs (as strings) for each hole DOM element
 */
function getAllHoleIds() {
    const allHoles = document.querySelectorAll('.hole'); 
    const ids = [];
    for(const hole of allHoles) {
        ids.push(hole.getAttribute('id'));
    }
    return ids;
}