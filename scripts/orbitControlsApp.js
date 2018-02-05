var thing = (function() {
  "use stict";

  // Declare all global variables
  var scene = new THREE.Scene(),
    renderer = window.WebGLRenderingContext
      ? new THREE.WebGLRenderer()
      : new THREE.CanvasRenderer(),
    light = new THREE.AmbientLight(0xffffff),
    camera,
    controls,
    box;

  // Function to initialize the scene
  function initScene() {
    // Renderer Size
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append renderer's domElement to the DOM
    document.getElementById("webgl-container").appendChild(renderer.domElement);

    // Add the light to the scene
    scene.add(light);

    // Create a new PerspectiveCamera
    camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      10
    );

    // Set the camera's position and add it to the scene
    camera.position.z = 100;
    scene.add(camera);

    // Create a new box object
    box = new THREE.Mesh(
      new THREE.BoxGeometry(20, 20, 20),
      new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors
      })
    );

    // Call the assignColorsToCube function on the box and add it to the scene
    assignColorsToCube(box);
    scene.add(box);

    controls = new THREE.OrbitControls(camera);
    controls.addEventListener("change", render);

    // Call the render function to render the scene to the DOM
    render();
  }

  // Function to assign colors to the cube
  function assignColorsToCube(cube) {
    // Create an array of colors using rgb values
    var colors = [
      new THREE.Color("rgb(255,0,0)"),
      new THREE.Color("rgb(0,255,0)"),
      new THREE.Color("rgb(0,0,255)"),
      new THREE.Color("rgb(255,255,0)"),
      new THREE.Color("rgb(255,0,255)")
    ];

    /// Loop over the colors array with a for loop and assign colors to verticies
    for (var i = 0; i < 12; i += 2) {
      // Comment
      var color = colors[i / 2];

      cube.geometry.faces[i].color = color;
      cube.geometry.faces[i + 1].color = color;
    }
  }

  function render() {
    renderer.render(scene, camera);
  }

// Automatically resize the output when the browser size changes
window.addEventListener('resize', onResize, false);

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

  window.onload = initScene;

  return {
    scene: scene
  };
})();
