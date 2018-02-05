'use strict';
var scene, aspect, camera, renderer, stats;

function init() {
  stats = initStats();

  scene = new THREE.Scene();
  aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, aspect, 30, 3000);
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee, 1.0));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;

  var planeGeometry = new THREE.PlaneBufferGeometry(60, 40, 1, 1);
  var planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  scene.add(plane);

  // Create a new geometry, material and apply it to the cube mesh
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var geometry2 = new THREE.BoxGeometry(200, 50, 50);
  var material = new THREE.MeshBasicMaterial({
    color: 0xa3f93f,
    wireframe: true
  });

  var cubeA = new THREE.Mesh(geometry, material);
  cubeA.castShadow = true;
  cubeA.position.set(10, 10, 0);
  scene.add(cubeA);

  var cubeB = new THREE.Mesh(geometry2, material);
  cubeB.castShadow = true;
  cubeB.position.set(-10, -40, 0);
  scene.add(cubeB);

  //!Create Sphere Geometries
  var sphereGeometry = new THREE.SphereGeometry(94, 36, 49);
  var sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0xeeeeee,
    wireframe: true
  });

  var sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere1);

  //!Set the camera position
  camera.position.z = 20;
  camera.position.y = 30;
  camera.position.x = -50;
  camera.lookAt(scene.position);

  var ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(sphere1.position);
  spotLight.castShadow = true;
  scene.add(spotLight);

  //!.Create a new group
  var group = new THREE.Group();
  group.add(cubeA);
  group.add(cubeB);
  scene.add(group);

  //! Append domElement to DOM
  document.body.appendChild(renderer.domElement);

  render();
}

//! Create a function to render the cubes
function render() {
  stats.update();
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function initStats() {
  var stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.getElementById('stats-container').appendChild(stats.domElement);
  return stats;
}

window.addEventListener('resize', onResize, false);

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;
