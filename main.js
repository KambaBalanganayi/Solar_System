import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


//Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

//Moon
const moonTexture = new THREE.TextureLoader().load('./img/moon.jpg');
const normalMoonTexture = new THREE.TextureLoader().load('./img/moonNormal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({
    map:moonTexture,
    normalMap:normalMoonTexture,
  })
)
scene.add(moon);

//Lights
const pointLight = new THREE.PointLight(0x0eeffe);
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

//Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);



//Stars
function addStar(){
  const geometry = new THREE.IcosahedronGeometry(.2, 3);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);


  const [x, y, z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));


  star.position.set(x, y, z);
  scene.add(star);
}

Array(400).fill().forEach(addStar);


//Background
const spaceTexture = new THREE.TextureLoader().load('./img/spaceBlue.jpg');
scene.background = spaceTexture;


//Avatar
const kamTexture = new THREE.TextureLoader().load('./img/selfi.png');
const kam = new THREE.Mesh(
  new THREE.BoxGeometry(8,8,8),
  new THREE.MeshBasicMaterial({map:kamTexture})
);
scene.add(kam);



//Earth

const earthTexture = new THREE.TextureLoader().load('./img/earth.jpg');
const normalTexture = new THREE.TextureLoader().load('./img/earthNormal.png');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map:earthTexture,
    normalMap:normalTexture,
  })
)
scene.add(earth);

earth.position.z = 30;
earth.position.setX(-10);
earth.position.setY(-1);

moon.position.z = 15;
moon.position.x = -15;
moon.position.y = -7;

kam.position.z = 12;
kam.position.x = 10;
kam.position.y = 2;



//Scroll Animation
function moveCamera() {
   
  const t = document.body.getBoundingClientRect().top;

  // camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
  
}

document.body.onscroll = moveCamera;
moveCamera();

//Animation Loop
function animate(){
  requestAnimationFrame(animate);
  
  moon.rotation.x += 0.001;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.001;
  
  earth.rotation.x += 0.005;
  earth.rotation.y += 0.0005;

  kam.rotation.y += 0.0015;
  kam.rotation.x += 0.0019;

  // controls.update();
  
  renderer.render(scene, camera);

}

animate();