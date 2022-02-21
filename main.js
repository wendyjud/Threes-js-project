import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus
const geometry = new THREE.TorusGeometry(10, 2, 30, 50);
const material = new THREE.MeshStandardMaterial({ color: 0x0887d0 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Torus2
const geometry2 = new THREE.TorusGeometry(5, 2, 30, 50);
const material2 = new THREE.MeshStandardMaterial({ color: 0x000000 });
const torus2 = new THREE.Mesh(geometry2, material2);
scene.add(torus2);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(4, 20, 20),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

// jupiter

const moonTexture2 = new THREE.TextureLoader().load('jupiter.jpg');
const normalTexture2 = new THREE.TextureLoader().load('normal.jpg');

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(4, 25, 25),
  new THREE.MeshStandardMaterial({
    map: moonTexture2,
    normalMap: normalTexture2,
  })
);

// planeta

const moonTexture3 = new THREE.TextureLoader().load('color.jpg');
const normalTexture3 = new THREE.TextureLoader().load('textura.jpg');

const planeta = new THREE.Mesh(
  new THREE.SphereGeometry(2, 15, 15),
  new THREE.MeshStandardMaterial({
    map: moonTexture3,
    normalMap: normalTexture3,
  })
);

scene.add(moon);
moon.position.z = 20;
moon.position.setX(-10);

scene.add(jupiter);
jupiter.position.z = 10;
jupiter.position.setX(-8);

scene.add(planeta);
planeta.position.z = 10;
planeta.position.setX(-1);


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jupiter.rotation.x += 0.05;
  jupiter.rotation.y += 0.075;
  jupiter.rotation.z += 0.05;

  planeta.rotation.x += 0.05;
  planeta.rotation.y += 0.075;
  planeta.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'Star Wars.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.3 );
	sound.play();
});

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  //torus.rotation.x += 0.01;
  //torus.rotation.y += 0.005;
  //torus.rotation.z += 0.01;

  torus2.rotation.x += 0.05;
  //torus2.rotation.y += 0.005;
  //torus2.rotation.z += 0.01;

  moon.rotation.x += 0.008;
  jupiter.rotation.x +=0.006;
  planeta.rotation.x +=0.012;
  // controls.update();

  renderer.render(scene, camera);
}

animate();
