var example = (function() {
  "use strict";

  var scene = new THREE.Scene(),
    renderer = new THREE.WebGLRenderer(),
    light = new THREE.AmbientLight(0xffffff),
    camera,
    manualGeometry;

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

    camera.position.z = 5;
    scene.add(camera);

    var material = new THREE.MeshBasicMaterial({
      // Specify that you are using the colors of the verticies
      vertexColors: THREE.VertexColors,
      // Specify that the triangle is double sided
      side: THREE.DoubleSide
    });

    // Create a new instance of THREE.Geometry()
    var triangleGeometry = new THREE.Geometry();

    // Define the verticies, and push the coordinates to the triangleGeometry.verticies array
    triangleGeometry.vertices.push(new THREE.Vector3(0.0, 1.0, 0.0));
    triangleGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
    triangleGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));

    // Push the faces to the triangleGeometry.verticies array.
    // This defines how the verticies connect together
    triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));

    // Set the colors of
    triangleGeometry.faces[0].vertexColors[0] = new THREE.Color(0xff0000);
    triangleGeometry.faces[0].vertexColors[1] = new THREE.Color(0x00ff00);
    triangleGeometry.faces[0].vertexColors[2] = new THREE.Color(0x0000ff);

    // Create the mesh using the triangleGeometry object
    manualGeometry = new THREE.Mesh(triangleGeometry, material);

    scene.add(manualGeometry);

    render();
  }

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
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
