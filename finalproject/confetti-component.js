AFRAME.registerComponent('confetti', {
  init: function () {
    const sceneEl = this.el.sceneEl;
    const confettiCount = 400;
    const confettiGroup = new AFRAME.THREE.Group();
    confettiGroup.position.set(-8, 0, -10);

    // create confetti mesh
    function createConfetti() {
      const geometry = new AFRAME.THREE.BoxGeometry(0.1, 0.1, 0.1);
      const material = new AFRAME.THREE.MeshBasicMaterial({ 
        color: getRandomColor(), 
        side: AFRAME.THREE.DoubleSide, });
      const confetti = new AFRAME.THREE.Mesh(geometry, material);

      confetti.position.set(
        Math.random() * 10 - 5,
        Math.random() * 5 + 10, 
        Math.random() * 10 - 5
      );


      return confetti;
    }

    // random color
    function getRandomColor() {
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    // add confetti
    for (let i = 0; i < confettiCount; i++) {
      const confetti = createConfetti();
      confettiGroup.add(confetti);
    }

    const confettiBody = document.createElement('a-entity');
    confettiBody.setObject3D('mesh', confettiGroup);
    sceneEl.appendChild(confettiBody);


    confettiBody.setAttribute('visible', false);

    // start animation 
    const startAnimationButton = document.getElementById('center');
    startAnimationButton.addEventListener('click', function () {

      confettiBody.setAttribute('visible', true);

      confettiBody.setAttribute('animation__confetti', {
        property: 'position',
        dur: 1500,
        from: '-1 -3 2',
        to: '-1 -12 2',
        loop: true,
      });


      const winText = document.createElement('a-text');
      winText.setAttribute('value', 'You win! Restart maze?');
      winText.setAttribute('position', '-9 2 -9');
      sceneEl.appendChild(winText);


      winText.addEventListener('click', function () {

        const player = document.getElementById('player');
        player.setAttribute('position', '-8 1.6 19');
        confettiBody.removeAttribute('animation__confetti');

        confettiBody.setAttribute('visible', false);
        winText.setAttribute('visible', false);
        
        
      });

      
    });


    
    
  },
  
});

