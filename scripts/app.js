var spherical = (function() {
  "use strict";

  var scene = new THREE.Scene(),
    light = new THREE.PointLight(0xffffff),
    camera,
    renderer = new THREE.WebGLRenderer(),
    sphere,
    sphere2,
    sphere3,
    sphere4,
    sphere5,
    sphere6,
    sphere7,
    stats;

  function initScene() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("webgl-container").appendChild(renderer.domElement);

    scene.add(light);

    camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    camera.position.z = 80;
    scene.add(camera);

    var material = new THREE.MeshBasicMaterial({
      color: "red",
      wireframe: true
    });

    var material2 = new THREE.MeshBasicMaterial({
      color: "orange",
      wireframe: true
    });

    var material3 = new THREE.MeshBasicMaterial({
      color: "yellow",
      wireframe: true
    });

    var material4 = new THREE.MeshBasicMaterial({
      color: "green",
      wireframe: true
    });

    var material5 = new THREE.MeshBasicMaterial({
      color: "blue",
      wireframe: true
    });

    var material6 = new THREE.MeshBasicMaterial({
      color: "violet",
      wireframe: true
    });

    var material7 = new THREE.MeshBasicMaterial({
      color: "white",
      opacity: 0.1,
      wireframe: true
    });

    sphere = new THREE.Mesh(new THREE.SphereGeometry(15, 19, 15), material);

    sphere2 = new THREE.Mesh(new THREE.SphereGeometry(50, 15, 20), material2);

    sphere3 = new THREE.Mesh(new THREE.SphereGeometry(30, 67, 15), material3);

    sphere4 = new THREE.Mesh(new THREE.SphereGeometry(20, 82, 19), material4);

    sphere5 = new THREE.Mesh(new THREE.SphereGeometry(25, 10, 19), material5);

    sphere6 = new THREE.Mesh(new THREE.SphereGeometry(35, 10, 15), material6);

    sphere7 = new THREE.Mesh(new THREE.SphereGeometry(40, 10, 15), material7);

    sphere.name = "sphere";
    sphere2.name = "sphere2";
    sphere3.name = "sphere3";
    sphere4.name = "sphere3";
    sphere5.name = "sphere3";
    sphere6.name = "sphere3";
    sphere7.name = "sphere3";

    scene.add(sphere);
    scene.add(sphere2);
    scene.add(sphere3);
    scene.add(sphere4);
    scene.add(sphere5);
    scene.add(sphere6);
    scene.add(sphere7);

    stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);

    render();
  }

  function render() {
    sphere.rotation.y += 0.005;
    sphere.rotation.x += 0.019;
    sphere.rotation.z += 0.019;

    sphere2.rotation.y += -0.005;
    sphere2.rotation.x += 0.019;
    sphere2.rotation.z += -0.019;

    sphere3.rotation.x += 0.019;
    sphere3.rotation.y += 0.005;
    sphere3.rotation.z += 0.018;

    sphere4.rotation.x += -0.019;
    sphere4.rotation.y += -0.005;
    sphere4.rotation.z += 0.019;

    sphere5.rotation.x += 0.019;
    sphere5.rotation.y += 0.005;
    sphere.rotation.z += -0.019;

    sphere6.rotation.x += 0.019;
    sphere6.rotation.y += -0.005;
    sphere6.rotation.z += 0.019;

    sphere7.rotation.x += 0.019;
    sphere7.rotation.y += 0.005;
    sphere7.rotation.z += -0.019;

    renderer.render(scene, camera);
    requestAnimationFrame(render);

    stats.update();
  }

  window.onload = initScene;

  return {
    scene: scene,
    sphere: sphere
  };
})();
