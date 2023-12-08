


AFRAME.registerComponent('confetti', {
    init: function () {
      const sceneEl = this.el.sceneEl;
      const confettiCount = 200;
      const confettiGroup = new AFRAME.THREE.Group();
  
      // Function to create a single confetti mesh
      function createConfetti() {
        const geometry = new AFRAME.THREE.BoxGeometry(0.1, 0.1, 0.1);
        const material = new AFRAME.THREE.MeshBasicMaterial({ color: getRandomColor() });
        const confetti = new AFRAME.THREE.Mesh(geometry, material);
  
        confetti.position.set(
          Math.random() * 10 - 5,
          Math.random() * 5 + 10, // Start confetti higher up
          Math.random() * 10 - 5
        );
  
        return confetti;
      }
  
      // Function to generate a random color
      function getRandomColor() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        return colors[Math.floor(Math.random() * colors.length)];
      }
  
      // Create and add confetti to the scene
      for (let i = 0; i < confettiCount; i++) {
        const confetti = createConfetti();
        confettiGroup.add(confetti);
      }
  
      // Create a dynamic body for the confettiGroup and add it to the scene
      const confettiBody = document.createElement('a-entity');
      confettiBody.setObject3D('mesh', confettiGroup);
      sceneEl.appendChild(confettiBody);
  
    //   // Animate confetti
    //   this.el.addEventListener('tick', function () {
    //     confettiGroup.children.forEach((confetti) => {
    //       // Move confetti down
    //       confetti.position.y -= 0.05;
  
    //       // Reset confetti when it goes below a certain height
    //       if (confetti.position.y < -5) {
    //         confetti.position.y = Math.random() * 5 + 10;
    //       }
    //     });
    //   });
    },
  });
  