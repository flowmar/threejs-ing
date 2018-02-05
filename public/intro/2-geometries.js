'use strict';
var scene, renderer, stats, camera, aspect;

function init() {
  scene = new THREE.Scene();
  aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee, 1.0));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;

  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 40, 50);
  spotLight.castShadow = true;
  scene.add(spotLight);

  var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  //! Rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  scene.add(plane);

  camera.position.x = -50;
  camera.position.y = 30;
  camera.position.z = 20;
  camera.lookAt(new THREE.Vector3(-10, 0, 0));

  var ambientLight = new THREE.AmbientLight(0x090909);

  scene.add(ambientLight);

  addGeometries(scene);

  document.getElementById('webgl-container').appendChild(renderer.domElement);

  var step = 0;

  renderScene();
}

function addGeometries(scene) {
  var geoms = [];

  geoms.push(new THREE.CylinderGeometry(1, 4, 4));

  geoms.push(new THREE.BoxGeometry(2, 2, 2));

  geoms.push(new THREE.SphereGeometry(2));

  geoms.push(new THREE.IcosahedronGeometry(4));

  // create a convex shape (a shape without dents)
  // using a couple of points
  // for instance a cube
  var points = [
    new THREE.Vector3(2, 2, 2),
    new THREE.Vector3(2, 2, -2),
    new THREE.Vector3(-2, 2, -2),
    new THREE.Vector3(-2, 2, 2),
    new THREE.Vector3(2, -2, 2),
    new THREE.Vector3(2, -2, -2),
    new THREE.Vector3(-2, -2, -2),
    new THREE.Vector3(-2, -2, 2)
  ];

  geoms.push(new THREE.ConvexGeometry(points));
  // create a lathgeometry
  //http://en.wikipedia.org/wiki/Lathe_(graphics)
  var pts = []; //points array - the path profile points will be stored here
  var detail = 0.1; //half-circle detail - how many angle increments will be used to generate points
  var radius = 3; //radius for half_sphere
  for (
    var angle = 0.0;
    angle < Math.PI;
    angle += detail //loop from 0.0 radians to PI (0 - 180 degrees)
  )
    pts.push(
      new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
    ); //angle/radius to x,z
  geoms.push(new THREE.LatheGeometry(pts, 12));

  // create a OctahedronGeometry
  geoms.push(new THREE.OctahedronGeometry(3));

  // create a geometry based on a function
  geoms.push(
    new THREE.ParametricGeometry(THREE.ParametricGeometries.mobius3d, 20, 10)
  );

  //
  geoms.push(new THREE.TetrahedronGeometry(3));

  geoms.push(new THREE.TorusGeometry(3, 1, 10, 10));

  geoms.push(new THREE.TorusKnotGeometry(3, 0.5, 50, 20));

  var j = 0;
  for (var i = 0; i < geoms.length; i++) {
    var cubeMaterial = new THREE.MeshLambertMaterial({
      wireframe: true,
      color: Math.random() * 0xffffff
    });

    var materials = [
      new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff,
        shading: THREE.FlatShading
      }),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true
      })
    ];

    var mesh = THREE.SceneUtils.createMultiMaterialObject(geoms[i], materials);
    mesh.traverse(function(e) {
      e.castShadow = true;
    });

    //var mesh = new THREE.Mesh(geoms[i],materials[i]);
    //mesh.castShadow=true;
    mesh.position.x = -24 + (i % 4) * 12;
    mesh.position.y = 4;
    mesh.position.z = -8 + j * 12;

    if ((i + 1) % 4 == 0) j++;
    scene.add(mesh);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
  }

  document.getElementById('webgl-container').appendChild(renderer.domElement);
  renderScene();
}

function renderScene() {
  cube.rotation.x += controls.rotationSpeed;
  cube.rotation.y += controls.rotationSpeed;
  cube.rotation.z += controls.rotationSpeed;

  step += controls.bouncingSpeed;
  sphere.position.x = 20 + 10 * Math.cos(step);
  sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

  stats.update();

  requestAnimationFrame(renderScene);
  renderer.render(scene, camera);
}

window.addEventListener('resize', onResize, false);

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;
