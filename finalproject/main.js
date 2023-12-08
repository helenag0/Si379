// import { startConfetti } from 'confetti';

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

  generateMazeWalls();

  

const camera = document.getElementById('player'); 
camera.setAttribute('raycaster', {
  showLine: true,
  far: 5,
  objects: '.clickable, .ground, .wall',
});

  

AFRAME.registerComponent('clickable', {
  init: function () {
    const el = this.el;
    el.addEventListener('click', function () {
      const player = document.getElementById('player');
      player.setAttribute('position', '-8 1.6 19');
    });
  },
});

document.getElementById('resetButton').setAttribute('reset-game', '');


  
