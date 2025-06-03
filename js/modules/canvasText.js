export function canvasTextParticles() {
  // *** Select Elements & Initializating Variables ***
  const canvas02 = document.getElementById('canvas-02');
  const ctx = canvas02.getContext('2d');
  const gap = 2;
  const canvas02Delay = 1500;
  const canvasHeadingPrimary = 'My Hope';
  const particles = [];
  // *** End of Select Elements & Initializating Variables ***

  // *** Setup Canvas Responsive ***
  canvasResponsive();

  function canvasResponsive() {
    let fontSize = 120;
    let canvas02Width = 1000;
    let canvas02Height = 300;

    if (window.innerWidth < 450) {
      canvas02Width = 400;
      canvas02Height = 150;
      fontSize = 70;
    } else if (window.innerWidth < 768) {
      canvas02Width = 700;
      canvas02Height = 200;
      fontSize = 100;
    }

    canvas02.width = canvas02Width;
    canvas02.height = canvas02Height;

    ctx.clearRect(0, 0, canvas02.width, canvas02.height);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = `bold ${fontSize}px Arial`;

    ctx.fillText(
      canvasHeadingPrimary,
      canvas02.width / 2,
      canvas02.height * 0.2
    );
  }
  // *** End of Setup Canvas Responsive ***

  // *** Class Particle, Update & Draw Methods ***
  class Particle {
    constructor(x, y) {
      this.x = Math.random() * canvas02.width;
      this.y = Math.random() * canvas02.height;

      this.targetX = x;
      this.targetY = y;

      this.size = 2; // 1,2,3,4 testuj

      this.speed = Math.random() * 0.05 + 0.02;
    }

    update() {
      this.x += (this.targetX - this.x) * this.speed;
      this.y += (this.targetY - this.y) * this.speed;
    }

    draw() {
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }
  // *** End of Class Particle, Update & Draw Methods ***

  // *** Create Particles ***
  function createParticles() {
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#222';
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    const canvasImageData = ctx.getImageData(
      0,
      0,
      canvas02.width,
      canvas02.height
    );
    ctx.clearRect(0, 0, canvas02.width, canvas02.height);

    for (let y = 0; y < canvas02.height; y += gap) {
      for (let x = 0; x < canvas02.width; x += gap) {
        const index = (y * canvas02.width + x) * 4;
        const alphaCanal = canvasImageData.data[index + 3];

        if (alphaCanal > 0) {
          particles.push(new Particle(x, y));
        }
      }
    }

    return particles;
  }

  let resultParticles = createParticles();
  // *** End of Create Particles ***

  // *** Animate Function Loop & setTimeout***
  function animate() {
    ctx.clearRect(0, 0, canvas02.width, canvas02.height);

    resultParticles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  }

  setTimeout(() => {
    animate();
    canvas02.style.display = 'block';
  }, canvas02Delay);
  // *** End of Animate Function Loop & setTimeout***
}
