import { autoWriteText } from './autoWriteText.js';

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
export function myGirlThreejs() {
  // *** Scene and Camera ***
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  camera.position.z = 1000;
  // *** End of Scene and Camera ***

  // *** Renderer ***
  let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector('.section-04').appendChild(renderer.domElement);
  // *** End of Renderer ***

  // *** Initializing Variables ***
  let points, geometry, colorAttribute;
  let endPositions = [];
  let startColors = [],
    trueColors = [];
  let revealStarted = false;
  // *** End of Initializing Variables ***

  //   *** Load Image for particles animation 3D ***
  const img = new Image();
  img.src = './img/My Girl.png';
  img.alt = 'Girl with big pencil ✏️';
  img.crossOrigin = 'anonymous';
  //   *** End of Load Image for particles animation 3D ***

  // *** On Image Load ***
  img.onload = () => {
    const MAX_HEIGHT = 1200;
    const scale = img.height > MAX_HEIGHT ? MAX_HEIGHT / img.height : 1;
    const w = Math.floor(img.width * scale);
    const h = Math.floor(img.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);

    const imageData = ctx.getImageData(0, 0, w, h).data;
    createParticlesFromImage(imageData, w, h);

    // *** If less than 1100 width, stop whole effect ***
    if (window.innerWidth < 1100) {
      const questionAnswer = document.getElementById('question-answer');
      questionAnswer.style.display = 'none';
      stopAnimation();
    }
    // *** End of If less than 1100 width, stop whole effect ***
  };
  // *** End of On Image Load ***

  // *** Initializing gsap time line ***
  let TLautoTextAndGirl;
  // *** End of Initializing gsap time line ***

  // *** Create Particles Effect ***
  function createParticlesFromImage(data, width, height) {
    geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    endPositions = [];

    const skip = 2;

    for (let y = 0; y < height; y += skip) {
      for (let x = 0; x < width; x += skip) {
        const i = (y * width + x) * 4;
        const alpha = data[i + 3];

        if (alpha > 100) {
          const xPos = x - width / 2;
          const yPos = -(y - height / 2);
          const zPos = 0;

          endPositions.push(xPos, yPos, zPos);

          // *** Start Random Position ***
          positions.push(
            (Math.random() - 0.5) * 3000,
            (Math.random() - 0.5) * 3000,
            (Math.random() - 0.5) * 3000
          );
          // *** End of Start Random Position ***

          // *** Start color 0.7 ***
          const startR = 0.7,
            startG = 0.7,
            startB = 0.7;
          colors.push(startR, startG, startB);
          startColors.push(startR, startG, startB);
          // *** End of Start color 0.7 ***

          // *** True color of image after animation ***
          const r = data[i] / 255;
          const g = data[i + 1] / 255;
          const b = data[i + 2] / 255;
          trueColors.push(r, g, b);
          // *** End of True color of image after animation ***
        }
      }
    }

    // *** Geometry, Material & Mesh (geometry,material) ***
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    colorAttribute = new THREE.Float32BufferAttribute(colors, 3);
    geometry.setAttribute('color', colorAttribute);

    const material = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      transparent: true,
      opacity: 1,
    });

    points = new THREE.Points(geometry, material);
    scene.add(points);
    // *** End of Geometry, Material & Mesh (geometry,material) ***

    // *** Gsap Sequences Animation ***
    TLautoTextAndGirl = gsap.timeline();
    const timeGirl = 10;

    // *** Start ***
    TLautoTextAndGirl.add(() => {
      animate();
    });
    // *** End of Start ***

    // *** Reveal True Color ***
    TLautoTextAndGirl.to(
      {},
      {
        duration: timeGirl,
        onComplete: () => {
          revealStarted = true;
        },
      }
    );
    // *** End of Reveal True Color ***

    // *** Auto Text Animation ( typed js custom effect ) ***
    TLautoTextAndGirl.add(() => {
      autoWriteText();
    }, '-=5.8');
    // *** End of Auto Text Animation ( typed js custom effect ) ***

    // *** Select and Start Wrapper Animation with delay 5.5 ***
    const wrapper = document.getElementById('wrapper');

    TLautoTextAndGirl.to(wrapper, {
      delay: 5.5,
      onComplete: () => {
        wrapper.classList.add('active');
      },
    });
    // *** End of Select and Start Wrapper Animation with delay 5.5 ***

    // *** Start Scale Animations ***
    TLautoTextAndGirl.add(() => {
      startScaleAnimation(0);
    }, '-=1.5');

    TLautoTextAndGirl.to(
      {},
      {
        duration: 0.45,
        onComplete: () => {
          points.position.set(-window.innerWidth / 2, 0, 0);
          startScaleAnimation(1);
        },
      },
      '-=1.2'
    );

    TLautoTextAndGirl.to(
      {},
      {
        duration: 0.5,
        onComplete: () => {
          points.position.set(-window.innerWidth / 2, 0, 0);
          startScaleAnimation(0);
        },
      }
    );
    // *** End of Start Scale Animations ***

    // *** Select Other Componets ( Todo App Dashboard ) ***
    const girl = document.querySelector('.girl');
    const todoApp = document.querySelector('.todo');
    const calendar = document.querySelector('.calendar');
    const cssArtContainer = document.querySelector('.container__css-art');
    const digitalClockEl = document.getElementById('digital-clock');
    // *** End of Select Other Componets ( Todo App Dashboard ) ***

    // *** Three js Girl Effect OFF ***
    TLautoTextAndGirl.to(
      {},
      {
        duration: 0.3,
        delay: 0.2,
        onComplete: () => {
          points.visible = false;
        },
      },
      '-=0.3'
    );
    // *** End of Three js Girl Effect OFF ***

    // *** Add All Components ***
    TLautoTextAndGirl.to(
      girl,
      {
        onComplete: () => {
          girl.classList.add('active');
          todoApp.classList.add('active');
          cssArtContainer.classList.add('active');
          calendar.classList.add('active');
          digitalClockEl.classList.add('active');

          const section03 = document.querySelector('.section-03');

          // *** Section 03 - Login Section ***
          setTimeout(() => {
            // section03.style.visibility = 'hidden';
            // section03.style.pointerEvents = 'none';
            section03.style.display = 'none';
          }, 3000);
          // *** End of Section 03 - Login Section ***
        },
      },
      '-=0.2'
    );
    // *** End of Add All Components ***
    // *** End of Gsap Sequences Animation ***
  }
  // *** End of Create Particles Effect ***

  // *** Scale Target & Speed ***
  let targetScale = 1;
  let scaleSpeed = 0.15;
  // *** End of Scale Target & Speed ***

  // *** Set new scale target ***
  function startScaleAnimation(newScale) {
    targetScale = newScale;
  }
  // *** End of Set new scale target ***

  // *** Initializing true ( used to stop animation ) ***
  let girlThreejsRunning = true;
  let writeTextRunning = true;
  // *** End of Initializing true ( used to stop animation ) ***

  // *** Animate Function ***
  function animate() {
    if (!girlThreejsRunning) return;
    if (!writeTextRunning) return;

    requestAnimationFrame(animate);

    // *** Points ***
    if (points) {
      points.scale.x = THREE.MathUtils.lerp(
        points.scale.x,
        targetScale,
        scaleSpeed
      );
      points.scale.y = THREE.MathUtils.lerp(
        points.scale.y,
        targetScale,
        scaleSpeed
      );
      points.scale.z = THREE.MathUtils.lerp(
        points.scale.z,
        targetScale,
        scaleSpeed
      );

      const posAttr = geometry.getAttribute('position');
      for (let i = 0; i < posAttr.count; i++) {
        const i3 = i * 3;

        for (let j = 0; j < 3; j++) {
          posAttr.array[i3 + j] = THREE.MathUtils.lerp(
            posAttr.array[i3 + j],
            endPositions[i3 + j],
            0.02
          );
        }

        if (revealStarted) {
          colorAttribute.array[i3] = THREE.MathUtils.lerp(
            colorAttribute.array[i3],
            trueColors[i3],
            0.02
          );
          colorAttribute.array[i3 + 1] = THREE.MathUtils.lerp(
            colorAttribute.array[i3 + 1],
            trueColors[i3 + 1],
            0.02
          );
          colorAttribute.array[i3 + 2] = THREE.MathUtils.lerp(
            colorAttribute.array[i3 + 2],
            trueColors[i3 + 2],
            0.02
          );
        }
      }
      posAttr.needsUpdate = true;
      colorAttribute.needsUpdate = true;
    }
    // *** End of Points ***

    renderer.render(scene, camera);
  }

  // *** Stop Animation Function ***
  function stopAnimation() {
    girlThreejsRunning = false;
    writeTextRunning = false;

    scene.clear();

    TLautoTextAndGirl.progress(1);
    TLautoTextAndGirl.pause();
  }
  // *** End of Stop Animation Function ***

  // *** Event Listener - Resize ***
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerWidth < 1100) {
      stopAnimation();
    }
  });
  // *** End of Event Listener - Resize ***
  // *** End of Animate Function ***
}
