function init() {
  //* Initialize stats
  var stats = initStats();

  //* Create variables for the basic components of a scene
  var scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000),
    renderer = new THREE.WebGLRenderer();

  scene.add(camera);

  //* Set the color and size of the renderer
  renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;


  var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: "0xffffff"
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  //* Rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;
  scene.add(plane);

  //* Set and point the position of the camera
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  //* Add slight lighting
  var ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  //* Add spotlight to create shadows
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  //* Add fog to the scene
scene.fog=new THREE.Fog(0xffffff, 0.015, 100);
// scene.fog = new THREE.FogExp2( 0xffffff, 0.06 );

//! If you use the overrideMaterial property, all of the material that is set on any object will be replaced by the material of your choosing.
// scene.overrideMaterial = new THREE.MeshLambertMaterial( {
//  color: "0xffffff"
// });

  document.getElementById('webgl-container').appendChild(renderer.domElement);

  //* Create the controls for the scene
  var step = 0;

  var controls = new function () {
    this.rotationSpeed = 0.02;
    this.numberOfObjects = scene.children.length;

    //* Removes the last object if it is an instance of THREE.Mesh
    this.removeCube = function () {
      var allChildren = scene.children;
      var lastObject = allChildren[allChildren.length - 1];
      if (lastObject instanceof THREE.Mesh) {
        scene.remove(lastObject);
        this.numberOfObjects = scene.children.length;
      }
    }

    //* Adds a cube
    this.addCube = function () {
      var cubeSize = Math.ceil((Math.random() * 3));
      var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      var cubeMaterial = new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff
      });
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
      cube.name = "cube-" + scene.children.length;

      //* Place the cube in a random location and orientation in the scene
      cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
      cube.position.y = Math.round((Math.random() * 5));
      cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));

      scene.add(cube);
      this.numberOfObjects = scene.children.length;
    };

    this.outputObjects = function() {
      console.log(scene.children);
    }
  };

var gui = new dat.GUI();
gui.add(controls, 'rotationSpeed', 0, 0.5);
gui.add(controls, 'addCube');
gui.add(controls, 'removeCube');
gui.add(controls, 'outputObjects');
gui.add(controls, 'numberOfObjects').listen();

render();

function render() {
  stats.update();

  //* Rotate the cube around its axes
  scene.traverse(function(e) {
    if (e instanceof THREE.Mesh && e != plane){
      e.rotation.x += controls.rotationSpeed;
      e.rotation.y += controls.rotationSpeed;
      e.rotation.z += controls.rotationSpeed;
       }
  });

  //* Render the scene
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

  //* Initialize the stats.js library
  function initStats() {

    var stats = new Stats();
    stats.setMode(0); //* o: fps, 1: ms

    stats.domElement.style.positiom = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.getElementById('stats-output').appendChild(stats.domElement);

    return stats;
  }
}
window.onload = init;