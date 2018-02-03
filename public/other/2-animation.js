function init() {

  "use strict";
  // Create a function to initialize the stats.js library
  function initStats() {
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById("stats-output").appendChild(stats.domElement);
    return stats;
  }

// Create a new stats object
var stats = initStats();

  // Create a new scene object
  var scene = new THREE.Scene();

  // Createa a new camera
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);

  // Create a renderer
var renderer = new THREE.WebGLRenderer();
// renderer.setClearColor();
renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;

// Create axis helpers
var axes = new THREE.AxisHelper(20);
scene.add(axes);

// Create spotlight
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set(-40, 60, -10);
scene.add(spotLight);

// Allow the light to create shadows
spotLight.castShadow = true;

var step = 0;
  // Create a function to render the scene
  function renderScene() {

    // Rotate the cube
    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    // Bounce the ball
    step+= controls.bouncingSpeed;
    sphere.position.x = 20 + ( 10*(Math.cos(step)));
    sphere.position.y = 2 + (10*Math.abs(Math.sin(step)));

    // Update the stats
    stats.update();

    // Constantly keep updating the objects on the screen
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  };

// Create a geometry for the plane
var planeGeometry = new THREE.PlaneGeometry(60, 20);
// Create a material for the geometry
var planeMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff
});
//Create the plane object, applying the planeGeometry and the planeMaterial
var plane = new THREE.Mesh(planeGeometry, planeMaterial);

// Set the rotation and position of the plane object
plane.rotation.x =-0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z= 0;

// Let the object receive shadows
plane.receiveShadow = true;

// Add the plane to the scene
scene.add(plane);

// Create a new geometry
var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
// Create a new material
var cubeMaterial = new THREE.MeshLambertMaterial({
  color: 0xff0000,
  // wireframe: true
});
// Create the cube object using the geometry and material
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// Set the the position of the cube
cube.position.x = -4;
cube.position.y = 3;
cube.position.x = 0;

// Let the cube cast shadows
cube.castShadow = true;

// Add the cube to the scene
scene.add(cube);

// Create a new geometry
var sphereGeometry = new THREE.SphereGeometry(4, 20 , 20);
// Create a new material
var sphereMaterial = new THREE.MeshLambertMaterial({
  color: 0x7777ff,
  // wireframe: true
});
// Create the mesh using the geometry and material
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// Set the position
sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;

// Let the sphere cast shadows
sphere.castShadow = true;

// Add the sphere to the scene
scene.add(sphere);

// Set the position of the camera
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

 // Create controls for the properties that we will change using the GUI
 var controls = new function() {
  // This sets the default values of the properties
  this.rotationSpeed = 0.02;
  this.bouncingSpeed = 0.03;
 }
  // This creates the gui that will control the properties
  var gui =  new dat.GUI();
  gui.add(controls, 'rotationSpeed', 0, 0.5);
  gui.add(controls, 'bouncingSpeed', 0, 0.5);

// Append the created DOM element to the html page
document.getElementById("webgl-container").appendChild(renderer.domElement);
renderScene();


}


window.onload = init;