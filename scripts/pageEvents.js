var example = (function() {
  "use strict";

  // Create a new Scene object and declare global variables
  var scene = new THREE.Scene(),
    // Use the WebGLRenderer if the WebGLRenderingContext is set, if not, use the CanvasRenderer
    renderer = window.WebGLRenderingContext
      ? new THREE.WebGLRenderer()
      : new THREE.CanvasRenderer(),
    // Create a new white AmbientLight
    light = new THREE.AmbientLight(0xffffff),
    camera,
    plane,
    box;

  // Declare a function to initialize the Scene
  function initScene() {
    // Set the size of the rendered content to the inner width by inner height of the window
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById("webgl-container").appendChild(renderer.domElement);

    // Add the light to the scene
    scene.add(light);

    // Create a new PerspectiveCamera
    camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    // Set the position of the camera and add it to the scene
    camera.position.z = 200;
    scene.add(camera);

    // Create a new box with red MeshBasicMaterial
    box = new THREE.Mesh(
      new THREE.BoxGeometry(20, 20, 20),
      new THREE.MeshBasicMaterial({
        color: 0xff0000
      })
    );

    // Add the name property to the box and add the box to the scene

    box.name = "box";
    scene.add(box);

    // Create a new texture for the ground
    var texture = THREE.ImageUtils.loadTexture(
      "./../content/grasslight-big.jpg"
    );

    // Createa a material for the plane
    var planeMaterial = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide
    });

    // Create a new mesh for the plane
    plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), planeMaterial);

    // Rotate the plane 90 degrees around the x-axis and move the plane down 10 units on the y-axis
    plane.rotation.x = 90 * (Math.PI / 180);
    plane.position.y = -10;

    // Set the name property on the plane object and add it to the scene
    plane.name = "plane";
    scene.add(plane);

    render();
  }

  // Function to render the scene
  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  // Function to check the key that is pressed
  function checkKey(e) {
    // Set the different arrow keys to their respective keyCode value
    var left = 37,
      up = 38,
      right = 39,
      down = 40,
      increment = 1;

    // Set e  to the value that is passed into the function, or the event that is occurring on the window object
    e = e || window.event;

    // Depdending on which key is pressed, the camera's position will move in the indicated direction
    if (e.keyCode == up) {
      camera.position.z -= increment;
    } else if (e.keyCode == down) {
      camera.position.z += increment;
    } else if (e.keyCode == left) {
      camera.position.x -= increment;
    } else if (e.keyCode == right) {
      camera.position.x += increment;
    }
  }

  // When a key is pressed, the checkKey function is called
  window.onkeydown = checkKey;

  // When the window has finished loading, the scene is initialized
  window.onload = initScene;

  // Return the scene object
  return {
    scene: scene
  };
})();
