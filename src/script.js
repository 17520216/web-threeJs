import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Debug
// const gui = new dat.GUI();

// Text Loader
const loader = new THREE.TextureLoader();

const cross = loader.load("./cross.png");

const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("./textures/NormalMap.png");
console.log("normalTexture", normalTexture);
// Canvas
const canvas = document.querySelector("canvas.webgl");

const canvas2 = document.querySelector("canvas.webgl1");

canvas.addEventListener("mouseenter", function () {
  console.log("onHover");
});
// setTimeout(() => {
//   let height = document.querySelector("canvas.webgl").offsetHeight;
//   console.log("height", height);
// }, 2000);
// Scene
const scene = new THREE.Scene();
const scene1 = new THREE.Scene();

// Objects
const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);

const sphereGeometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

const circle = new THREE.BufferGeometry();
const circlePoint = 30000;

const positionArray = new Float32Array(circlePoint * 3);
for (let i = 1; i < circlePoint * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * (Math.random() * 5);
}
circle.setAttribute("position", new THREE.BufferAttribute(positionArray, 3));

// Test CFD

// Materials

const material2 = new THREE.MeshStandardMaterial();
material2.metalness = 0.7;
material2.roughness = 0.2;
// material2.wireframe = true;
material2.normalMap = normalTexture;

material2.color = new THREE.Color(0x242424);

const material = new THREE.PointsMaterial({
  size: 0.005,
  color: 0x211722,
});
const materialCircle = new THREE.PointsMaterial({
  size: 0.005,
  transparent: true,
  map: cross,
});

// Mesh

const sphere = new THREE.Points(geometry, material);
const sphere2 = new THREE.Mesh(sphereGeometry, material2);
const showCirclePoint = new THREE.Points(circle, materialCircle);

scene.add(sphere, showCirclePoint);
scene1.add(sphere2);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene1.add(pointLight);

const pointLight2 = new THREE.PointLight(0xff0000, 0.1);
pointLight2.position.set(-1.86, 1, -1.65);
pointLight2.intensity = 10;
scene1.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xe1ff, 0.1);
pointLight3.position.set(2.13, -3, -1.98);
pointLight3.intensity = 6.8;
scene1.add(pointLight3);

/*
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const sizes2 = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;

// scene.add(camera1);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
// });

let renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color("#BFBFBE"), 1);

let renderer1 = new THREE.WebGLRenderer({
  canvas: canvas2,
  alpha: true,
});
renderer1.setSize(sizes2.width, sizes2.height);
renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer1.setClearColor(new THREE.Color("#ffffff"), 1);
/**
 * Animate
 */

// Mouse Move
document.addEventListener("mousemove", moveMouse);

// uodate
const updateSphere = (e) => {
  sphere2.position.y = scrollY * 0.001;
};
window.addEventListener("scroll", updateSphere);

const windowHalfX = window.innerWidth;
const windowHalfY = window.innerHeight;

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

function moveMouse(e) {
  const elapsedTime = clock.getElapsedTime();

  mouseX = e.clientX - windowHalfX;
  mouseY = e.clientY - windowHalfY;

  // if (mouseY + windowHalfY < 500) {
  showCirclePoint.rotation.x = mouseY * (elapsedTime * 0.00008);
  showCirclePoint.rotation.y = mouseX * (elapsedTime * 0.00008);
  // } else if (mouseY + windowHalfY > 500) {

  //   targetX = mouseX * 0.001;
  //   targetY = mouseY * 0.001;
  //   sphere2.rotation.y += 0.5 * (targetX - sphere2.rotation.y);
  //   sphere2.rotation.x += 0.05 * (targetY - sphere2.rotation.x);
  //   sphere2.position.z += -0.05 * (targetY - sphere2.rotation.x);
  // }
}

const clock = new THREE.Clock();

const runJs = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.x = 1 * elapsedTime;
  showCirclePoint.rotation.y = 0.05 * elapsedTime;

  sphere2.rotation.y = 0.5 * elapsedTime;

  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;
  sphere2.rotation.y += 0.5 * (targetX - sphere2.rotation.y);
  sphere2.rotation.x += 0.05 * (targetY - sphere2.rotation.x);
  sphere2.position.z += -0.05 * (targetY - sphere2.rotation.x);

  // if (mouseY > 540) {
  //   // sphere2.rotation.y += 0.5 * (targetX - sphere2.rotation.y);
  //   // sphere2.rotation.x += 0.05 * (targetY - sphere2.rotation.x);
  //   // sphere2.position.z += -0.05 * (targetY - sphere2.rotation.x);
  // }

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene1, camera);
  renderer1.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(runJs);
};

runJs();
