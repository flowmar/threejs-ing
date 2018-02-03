var example = (function() {
  "use strict";

  // Declare global variables, create a scene, renderer, and light object
  var scene = new THREE.Scene(),
    renderer = window.WebGLRenderingContext
      ? new THREE.WebGLRenderer()
      : new THREE.CanvasRenderer(),
    light = new THREE.AmbientLight(0xffffff),
    camera,
    objects = [],
    sphere,
    sphere2,
    width = 800,
    height = 600;

  // Function to initialize scene
  function initScene() {
    // Set the size of the renderer
    renderer.setSize(width, height);

    // Append the domElement to the page
    document.getElementById("webgl-container").appendChild(renderer.domElement);

    // Add the light to the scene
    scene.add(light);

    // Create a new camera
    camera = new THREE.PerspectiveCamera(35, width / height, 1, 1000);

    // Set the camera position
    camera.position.z = 150;
    scene.add(camera);

    // Create a new sphere object
    sphere = new THREE.Mesh(
      new THREE.SphereGeometry(20, 16, 16),
      new THREE.MeshBasicMaterial({
        color: 0xff0000
      })
    );

    // Set the position of the sphere, and add it to the objects array
    sphere.position.set(-25, 0, 0);
    objects.push(sphere);

    // Create another sphere object
    sphere2 = new THREE.Mesh(
      new THREE.SphereGeometry(20, 16, 16),
      new THREE.MeshBasicMaterial({
        colof: 0x00ff00
      })
    );

    // Set the position of the second sphere and add it to the objects array
    sphere2.position.set(20, 0, 0);
    objects.push(sphere2);

    // Add the spheres to the scene
    scene.add(sphere);
    scene.add(sphere2);

    render();
  }

  // Render function
  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  // Function to run on mouse down
  function onDocumentMouseDown(event) {
    // Create a projector object
    var projector = new THREE.Projector();

    // Create a new vector
    var mouseClickVector = new THREE.Vector3(
      event.clientX / width * 2 - 1,
      -(event.clientY / height) * 2 + 1,
      0.5
    );

    // Unproject vector, passing in the mouseClickVector and camera
    projector.unprojectVector(mouseClickVector, camera);

    // Create a new raycaster
    var raycaster = new THREE.Raycaster(
      camera.position,
      mouseClickVector.sub(camera.position).normalize()
    );

    // C
    var intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
      intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
    }
  }

  // Initialize scene on window load
  window.onload = initScene;

  // Listen for the mousedown event
  window.addEventListener("mousedown", onDocumentMouseDown, false);

  return {
    scene: scene
  };
})();
