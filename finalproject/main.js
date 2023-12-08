// import { startConfetti } from 'confetti';

  
  // Function to generate the maze walls
  function generateMazeWalls() {
    const scene = document.querySelector('a-scene');
  
    mazeStructure.forEach((element) => {

      if (element.type === 'wall') {
          const wall = document.createElement('a-box');
          wall.setAttribute('position', `${element.x} 1 ${element.z}`);
          wall.setAttribute('scale', '2 2 2');
          wall.setAttribute('material', 'src: #texture-wall'); 
          wall.setAttribute('static-body', '');
          scene.appendChild(wall);
      } 
    });
  }
  
  // Call the function to generate the maze walls
  generateMazeWalls();
  startConfetti();
  

const camera = document.getElementById('player'); 
camera.setAttribute('raycaster', {
  showLine: true,
  far: 5,
  objects: '.clickable, .ground, .wall',
});


// function startConfettiOnCollision() {
//   const player = document.getElementById('player');
//   const centerBox = document.getElementById('center');

//   centerBox.addEventListener('collide', (event) => {
//     // Check if the collision is with the player
//     if (event.detail.body.el === player) {
//       startConfetti();
//     }
//   });
// }

// startConfettiOnCollision();

const centerBox = document.getElementById('center');

function startConfettiOnClick() {
  // Add a click event listener to the center box
  centerBox.addEventListener('click', () => {
    startConfetti();
    console.log("clicked");
  });
}

// Call the function to start confetti on click
startConfettiOnClick();
  

AFRAME.registerComponent('clickable', {
  init: function () {
    const el = this.el;
    el.addEventListener('click', function () {
      // Handle click event here, e.g., reset the game
      const player = document.getElementById('player');
      player.setAttribute('position', '-8 1.6 19');
    });
  },
});

// Add the 'reset-game' component to the reset button
document.getElementById('resetButton').setAttribute('reset-game', '');


  
