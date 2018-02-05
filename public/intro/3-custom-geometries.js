'use strict';
var scene, renderer, stats, camera, aspect;

function init() {
  stats = initStats();

  scene = new THREE.Scene();
  aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee, 1.0));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;

  var axes = new THREE.AxisHelper(20);
  scene.add(axes);

  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  scene.add(spotLight);
  spotLight.castShadow = true;
  var step = 0;

  function renderScene() {
    stats.update();

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  }
  var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  var planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  plane.receiveShadow = true;
  scene.add(plane);

  var vertices = [
    new THREE.Vector3(1, 3, 1),
    new THREE.Vector3(1, 3, -1),
    new THREE.Vector3(1, -3, 1),
    new THREE.Vector3(1, -1, -1),
    new THREE.Vector3(-1, 3, -1),
    new THREE.Vector3(-1, 3, 1),
    new THREE.Vector3(-1, 1, -1),
    new THREE.Vector3(-1, -1, 1)
  ];

  var faces = [
    new THREE.Face3(0, 2, 1),
    new THREE.Face3(2, 3, 1),
    new THREE.Face3(4, 6, 5),
    new THREE.Face3(6, 7, 5),
    new THREE.Face3(4, 5, 1),
    new THREE.Face3(5, 0, 1),
    new THREE.Face3(7, 6, 2),
    new THREE.Face3(6, 3, 2),
    new THREE.Face3(5, 7, 0),
    new THREE.Face3(7, 2, 0),
    new THREE.Face3(1, 3, 4),
    new THREE.Face3(3, 6, 4)
  ];

  var geom = new THREE.Geometry();
  geom.vertices = vertices;
  geom.faces = faces;
  geom.computeFaceNormals();

  var materials = [
    new THREE.MeshLambertMaterial({
      opacity: 0.6,
      color: 0x44ff44,
      transparent: true
    }),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true
    })
  ];

  var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
  mesh.children.forEach(function(e) {
    e.castShadow = true;
  });

  scene.add(mesh);

  function addControl(x, y, z) {
    var controls = new function() {
      this.x = x;
      this.y = y;
      this.z = z;
    }();

    return controls;
  }

  var controlPoints = [];
  controlPoints.push(addControl(3, 5, 3));
  controlPoints.push(addControl(3, 5, 0));
  controlPoints.push(addControl(3, 0, 3));
  controlPoints.push(addControl(3, 0, 0));
  controlPoints.push(addControl(0, 5, 0));
  controlPoints.push(addControl(0, 5, 3));
  controlPoints.push(addControl(0, 0, 0));
  controlPoints.push(addControl(0, 0, 3));

  var gui = new dat.GUI();
  gui.add(
    new function() {
      this.clone = function() {
        var clonedGeometry = mesh.children[0].geometry.clone();
        var materials = [
          new THREE.MeshLambertMaterial({
            opacity: 0.6,
            color: 0xff44ff,
            transparent: true
          }),
          new THREE.MeshBasicMaterial({
            color: 0x000000,
            wireframe: true
          })
        ];

        var mesh2 = THREE.SceneUtils.createMultiMaterialObject(
          clonedGeometry,
          materials
        );
        mesh2.children.forEach(function(e) {
          e.castShadow = true;
        });

        mesh2.translateX(5);
        mesh2.translateZ(5);
        mesh2.name = 'clone';
        scene.remove(scene.getChildByName('clone'));
        scene.add(mesh2);
      };
    }(),
    'clone'
  );

  for (var i = 0; i < 8; i++) {
    var f1 = gui.addFolder('Vertices ' + (i + 1));
    f1.add(controlPoints[i], 'x', -10, 10);
    f1.add(controlPoints[i], 'y', -10, 10);
    f1.add(controlPoints[i], 'z', -10, 10);
  }

  renderScene();

  function addCube() {}

  function render() {
    stats.update();

    var vertices = [];
    for (var i = 0; i < 8; i++) {
      vertices.push(
        new THREE.Vector3(
          controlPoints[i].x,
          controlPoints[i].y,
          controlPoints[i].z
        )
      );
    }

    mesh.children.forEach(function(e) {
      e.geometry.vertices = vertices;
      e.geometry.verticesNeedUpdate = true;
      e.geometry.computeFaceNormals();
    });

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000
  });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;

  cube.castShadow = true;
  scene.add(cube);
  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  sphere.position.x = 20;
  sphere.position.y = 4;
  sphere.position.z = 2;

  sphere.castShadow = true;

  scene.add(sphere);

  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  mesh.children.forEach(function(e) {
    e.geometry.vertices = vertices;
    e.geometry.verticesNeedUpdate = true;
    e.geometry.computeFaceNormals();
  });

  document.getElementById('webgl-container').appendChild(renderer.domElement);
  renderScene();
}

function initStats() {
  var stats = new Stats();

  stats.setMode(0); // 0: fps, 1: ms

  // Align top-left
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
