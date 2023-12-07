import { startConfetti } from 'confetti';
  
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
  
// Add raycaster to the camera to detect collisions with walls
const camera = document.querySelector('[camera]');
camera.setAttribute('raycaster', {
  showLine: true,
  far: 5,
  objects: '.wall'
});


function startConfettiOnClick() {
  const sign = document.querySelector('#center a-text');

  sign.addEventListener('click', () => {
    startConfetti(); // Call the confetti function
  });
}

// Call the function to start confetti on click
startConfettiOnClick();

  

  
