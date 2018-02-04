//! Create variables
var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
//! Append domElement to DOM
document.getElementById('webgl-container').appendChild(renderer.domElement);

// Create a new geometry, material and apply it to the cube mesh
var geometry = new THREE.BoxGeometry(1, 1, 1);
var geometry2 = new THREE.BoxGeometry(2, 2, 2);
var material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true
});
var cubeA = new THREE.Mesh(geometry, material);
cubeA.position.set(100, 100, 0);

var cubeB = new THREE.Mesh(geometry2, material);
cubeB.position.set(-100, -100, 0);

//!Set the camera position
camera.position.z = 5;

//!.Create a new group
var group = new THREE.Group;
scene.add(group);
group.add(cubeA);
group.add(cubeB);




var render = function() {
  requestAnimationFrame(render);
  cubeA.rotation.x += 0.1;
  cubeB.rotation.y += 0.1;
  renderer.render(scene, camera);
}

render();