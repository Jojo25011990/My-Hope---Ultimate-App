import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

export function sectionThreejsText() {
  // *** Select Canvas ***
  const canvas01 = document.getElementById('canvas-01');
  const section01 = document.querySelector('.section-01');
  // *** End of Select Canvas ***

  // *** Scene and Camera ***
  const scene = new THREE.Scene();

  const aspectRatio = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const camera = new THREE.PerspectiveCamera(
    70,
    aspectRatio.width / aspectRatio.height,
    0.1,
    1000
  );
  camera.position.z = 10;
  // *** End of Scene and Camera ***

  // *** Renderer ***
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas01,
  });
  renderer.setSize(aspectRatio.width, aspectRatio.height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  // *** End of Renderer ***

  // *** Letters, scaleFactor, spacing, planeSize and Responsive ****
  const letters = ['W', 'E', 'L', 'C', 'O', 'M', 'E'];

  let scaleFactor, spacing, planeSize;

  if (window.innerWidth < 768) {
    scaleFactor = 1.5;
    spacing = 0.9;
    planeSize = 1;

    if (window.innerWidth < 450) {
      scaleFactor = 1.2;
      spacing = 0.7;
      planeSize = 0.7;
    }
  } else {
    scaleFactor = 2;
    spacing = 1.5;
    planeSize = 1.5;
  }

  const a = 1 / Math.sqrt(3);
  const faceCenters = [
    new THREE.Vector3(a, a, a).multiplyScalar(scaleFactor),
    new THREE.Vector3(a, a, -a).multiplyScalar(scaleFactor),
    new THREE.Vector3(a, -a, a).multiplyScalar(scaleFactor),
    new THREE.Vector3(a, -a, -a).multiplyScalar(scaleFactor),
    new THREE.Vector3(-a, a, a).multiplyScalar(scaleFactor),
    new THREE.Vector3(-a, a, -a).multiplyScalar(scaleFactor),
    new THREE.Vector3(-a, -a, a).multiplyScalar(scaleFactor),
  ];
  // *** End of Letters and Responsive ****

  // *** Letter Material - Mesh ***
  const letterMeshes = [];
  const assemblePositions = [];

  function createLetterMaterial(letter) {
    // *** Size, Canvas, Ctx, Gradient, width & height ***
    const size = 200;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, size, size);

    canvas.width = size;
    canvas.height = size;
    // *** End of Size, Canvas, Ctx, width & height ***

    // *** Text, Gradient ***
    ctx.clearRect(0, 0, size, size);
    ctx.font = 'bold 150px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 150, 255, 0.8)';
    ctx.shadowBlur = 5;

    gradient.addColorStop(0, '#0044ff');
    gradient.addColorStop(1, '#ff0000');

    ctx.fillStyle = gradient;
    ctx.fillText(letter, size / 2, size / 2);
    // *** End of Text, Gradient ***

    // *** Three js Texture, Update, Mesh Basic Material ***
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });
    // *** End of Three js Texture, Update, Mesh Basic Material ***
  }
  // *** End of Letter Material - Mesh ***

  // *** Create Letter Meshes ***
  const totalLength = spacing * letters.length;
  const startX = -totalLength / 2 + spacing / 2;

  for (let i = 0; i < letters.length; i++) {
    const material = createLetterMaterial(letters[i]);
    const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
    const mesh = new THREE.Mesh(planeGeometry, material);

    mesh.position.copy(faceCenters[i]);

    const normal = faceCenters[i].clone().normalize();
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    mesh.quaternion.copy(quaternion);

    letterMeshes.push(mesh);
    scene.add(mesh);

    assemblePositions.push(new THREE.Vector3(startX + i * spacing, 0, 0));
  }
  // *** End of Create Letter Meshes ***

  // *** States ***
  let state = 'rotating';
  let rotationSpeed = 0.03;
  let flyStartTime = 0;
  let assembleStartTime = 0;
  let doneStartTime = 0;
  // *** End of States ***

  const flyTargets = letterMeshes.map((letterMesh, i) => {
    return faceCenters[i].clone().multiplyScalar(2.5);
  });

  // *** Animate ***
  let threejsTextRunning = true;

  function animate(time = 0) {
    if (!threejsTextRunning) return;

    requestAnimationFrame(animate);

    //  *** Conditions States ***
    if (state === 'rotating') {
      letterMeshes.forEach(letterMesh => {
        letterMesh.position.applyAxisAngle(
          new THREE.Vector3(0, 1, 0),
          rotationSpeed
        );
        letterMesh.position.applyAxisAngle(
          new THREE.Vector3(1, 0, 0),
          rotationSpeed / 2
        );
        letterMesh.quaternion.copy(
          new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            letterMesh.position.clone().normalize()
          )
        );
      });

      if (time > 6000) {
        state = 'flying';
        flyStartTime = time;
      }
    } else if (state === 'flying') {
      const elapsed = (time - flyStartTime) / 1000;
      letterMeshes.forEach((letterMesh, i) => {
        const startPosition = faceCenters[i];
        if (elapsed < 1) {
          letterMesh.position.lerpVectors(
            startPosition,
            flyTargets[i],
            elapsed
          );
        } else {
          letterMesh.position.copy(flyTargets[i]);
        }
        letterMesh.lookAt(camera.position);
      });

      if (elapsed > 1.5) {
        state = 'assembling';
        assembleStartTime = time;
      }
    } else if (state === 'assembling') {
      const elapsed = (time - assembleStartTime) / 500;
      letterMeshes.forEach((letterMesh, i) => {
        if (elapsed < 1) {
          letterMesh.position.lerp(assemblePositions[i], elapsed);
        } else {
          letterMesh.position.copy(assemblePositions[i]);
        }

        letterMesh.lookAt(camera.position);
      });

      if (elapsed > 1) {
        state = 'done';
        doneStartTime = time;
      }
    } else if (state === 'done') {
      if (time - doneStartTime > 1750) {
        letterMeshes.forEach(letterMesh => (letterMesh.visible = false));
      } else {
        letterMeshes.forEach(letterMesh => {
          letterMesh.visible = true;
          letterMesh.lookAt(camera.position);
        });
      }
    }

    renderer.render(scene, camera);
  }
  //  *** End of Conditions States ***

  animate();

  // *** Stop Animation threejsTextRunning & Return Function ***
  function stopAnimation() {
    threejsTextRunning = false;

    section01.style.display = 'none';

    if (canvas01) {
      canvas01.remove();
      console.log('uz to nefici');
    }
  }

  return { stopAnimation };
  // *** End of Stop Animation threejsTextRunning & Return Function ***
  // *** End of Animate ***
}
