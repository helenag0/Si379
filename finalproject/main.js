
// const mazeStructure = [
//     { type: 'wall', x: 0, z: 0 },
//     { type: 'wall', x: 2, z: 0 },
//     { type: 'wall', x: 4, z: 0 },
//     { type: 'wall', x: 0, z: 2 },
//     { type: 'floor', x: 2, z: 2 },
//     { type: 'wall', x: 4, z: 2 },
//     { type: 'wall', x: 0, z: 4 },
//     { type: 'wall', x: 2, z: 4 },
//     { type: 'wall', x: 4, z: 4 },
//     { type: 'wall', x: 6, z: 0 },
//     { type: 'wall', x: 8, z: 0 },
//     { type: 'wall', x: 6, z: 2 },
//     { type: 'wall', x: 8, z: 2 },
//     { type: 'wall', x: 6, z: 4 },
//     { type: 'wall', x: 8, z: 4 },
//     { type: 'wall', x: 6, z: 6 },
//     { type: 'wall', x: 8, z: 6 },
// ];

// function generateMazeStructure() {
//     const scene = document.querySelector('a-scene');


//     mazeStructure.forEach((element) => {
//         if (element.type === 'wall') {
//             const wall = document.createElement('a-box');
//             wall.setAttribute('position', `${element.x} 1 ${element.z}`);
//             wall.setAttribute('scale', '2 2 2');
//             wall.setAttribute('material', 'src: ./brick_texture.png'); // Replace with brick texture path
//             scene.appendChild(wall);
//         } else if (element.type === 'floor') {
//             const floor = document.createElement('a-plane');
//             floor.setAttribute('id', 'floor');
//             floor.setAttribute('position', `${element.x} 0 ${element.z}`);
//             floor.setAttribute('rotation', '-90 0 0');
//             floor.setAttribute('width', '2');
//             floor.setAttribute('height', '2');
//             floor.setAttribute('material', 'src: ./grass_texture.png');
//             scene.appendChild(floor);
//         }
//         else if (element.type === 'entrance') {
//             // Create an opening for the entrance
//             const entranceOpening = document.createElement('a-plane');
//             entranceOpening.setAttribute('position', `${element.x} 0.5 ${element.z}`);
//             entranceOpening.setAttribute('rotation', '0 0 0');
//             entranceOpening.setAttribute('width', '2');
//             entranceOpening.setAttribute('height', '1');
//             entranceOpening.setAttribute('material', 'visible: false'); // Make the opening invisible
//             scene.appendChild(entranceOpening);

//             // Create a sign outside the maze
//             const startSign = document.createElement('a-text');
//             startSign.setAttribute('value', 'Start');
//             startSign.setAttribute('position', `${element.x} 2 ${element.z + 1}`);
//             startSign.setAttribute('rotation', '0 0 0');
//             scene.appendChild(startSign);
//         }
//     });
// }

// // Call the maze generation function
// generateMazeStructure();

// Define the maze structure
const mazeStructure = [
    { type: 'wall', position: '-4 1 0', scale: '1 2 10'},
    { type: 'wall', position: '4 1 0', scale: '1 2 10' },
    { type: 'wall', position: '0 1 -4', scale: '8 2 1'},
    { type: 'wall', position: '0 1 4', scale: '8 2 1'}
  ];
  
  // Function to generate the maze walls
  function generateMazeWalls() {
    const scene = document.querySelector('a-scene');
  
    mazeStructure.forEach((element) => {
      if (element.type === 'wall') {
        const wall = document.createElement('a-box');
        wall.setAttribute('position', element.position);
        wall.setAttribute('scale', element.scale);
        // wall.setAttribute('color', element.color);
        wall.classList.add('wall'); // Add the 'wall' class for collision detection
        wall.setAttribute('material', 'src: ./brick_texture.png');
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
  

  
