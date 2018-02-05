var example = (function() {
  'use strict';

  var scene = new THREE.Scene(),
    renderer = new THREE.WebGLRenderer(),
    light = new THREE.AmbientLight(0xffffff),
    camera,
    shape;

  function initScene() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl-container').appendChild(renderer.domElement);

    scene.add(light);

    camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    camera.position.set(0, 20, 400);
    scene.add(camera);

    var material = new THREE.MeshBasicMaterial({
      wireframe: true
    });

    var shapePoints = [];

    shapePoints.push(new THREE.Vector2(0, 100));
    shapePoints.push(new THREE.Vector2(100, 0));
    shapePoints.push(new THREE.Vector2(-100, 0));

    var shapeSettings = new THREE.Shape(shapePoints);

    // Must create an extrusionSettings object
    var extrusionSettings = {
      steps: 100,
      amount: 100,
      bevelEnabled: true
    };

    // Create the Extrude geometry instance, passing in the shapeSettings object and the extrusionSettings object
    var shapeGeometry = new THREE.ExtrudeGeometry(
      shapeSettings,
      extrusionSettings
    );

    // Create the new shape mesh, passing in the shapeGeometry and an optional material.
    shape = new THREE.Mesh(shapeGeometry, material);

    scene.add(shape);

    render();
  }

  function render() {
    shape.rotation.x += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  window.onload = initScene;

  return {
    scene: scene
  };
})();
