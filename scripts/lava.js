var demo = (function() {
  "use strict";

  var scene = new THREE.Scene(),
    light,
    camera,
    renderer = new THREE.WebGLRenderer(),
    cube,
    plane;

  // Function to initialize the scene
  function initScene() {
    // Set the size of the renderer to the inner width of the window by the inner height of the window
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append the domElement created by the renderer to the webgl container
    document.getElementById("webgl-container").appendChild(renderer.domElement);

    // Create a new camera
    camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    // Set the starting z and y positions for the camera
    camera.position.z = 150;
    camera.position.y = -5;

    // Add the camera to the scene
    scene.add(camera);

    // When loading textures, make sure that you make the size of the image the same number for both the width and the height, otherwise it will not fit correctly. (ie 16 x 16 or 32 x 32)
    var texture = THREE.ImageUtils.loadTexture("./../content/fire.jpg"); //lava texture from http://opengameart.org/sites/default/files/fire.jpg

    // Tell Three.js how we are going to be repeating the texture These correspond to the X and Y directions
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    // Repeate the texture 10 times over the x-axis, and 10 times over the y-axis
    texture.repeat.set(10, 10);

    // Create a material for the plane
    plane = new THREE.Mesh(
      new THREE.PlaneGeometry(3400, 3400),
      new THREE.MeshPhongMaterial({
        // Emissive and specular color will give a glow effect to the material ds
        emissive: 0xffcb00,
        specular: 0xffcb00,
        shininess: 50,
        map: texture,
        side: THREE.DoubleSide
      })
    );

    // Rotate the plane around the X-axis 90 degrees and move it down 10 units on the Y axis
    plane.rotation.x = 90 * (Math.PI / 180);
    plane.position.y = -10;

    // Give the plane object a 'name' property, so that you can call it later
    plane.name = "plane";

    // Add the plane to the screen
    scene.add(plane);

    // Create a directional light
    light = new THREE.DirectionalLight(new THREE.Color("#ffee00"));
    light.position.set(0, 50, 0);

    // Add the light to the scene
    scene.add(light);

    render();
  }

  // Function to alter the geometry of the plane and give it a bubbly lava effect
  function alterGeometry() {
    for (var i = 0; i <= plane.geometry.vertices.length - 1; i++) {
      var random = Math.floor(Math.random() * 10 + 1) / 50;
      plane.geometry.vertices[i].z += random;
    }

    plane.geometry.verticesNeedUpdate = true;
    plane.material.needsUpdate = true;
  }

  // Function to render the texture and give it the 'moving' effect
  function render() {
    // A better way to do this would be with the Three.js clock
    var random = Math.floor(Math.random() * 10 + 1);

    if (random > 9) alterGeometry();

    // Offset the textures to make the lava have a flowing effect
    if (plane) {
      plane.material.map.offset.x += 0.001;
      plane.material.map.offset.y += 0.001;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  window.onload = initScene;

  return {
    scene: scene
  };
})();
