var demo = (function() {
  "use strict";

  // Declare variables, and create a new Scene
  var scene = new THREE.Scene(),
    light,
    directionalLight,
    camera,
    renderer = new THREE.WebGLRenderer(),
    cube,
    cube2,
    cubeRotate = false,
    normalsHelper,
    //textures from trail version of http://www.arroway-textures.com/en/catalog/0/441
    texturePath = "content/pavement/pavement-008_d100.png",
    bumpMapPath = "content/pavement/pavement-008_b030.png",
    itemsToControl;

  // Declare function to initialize scene
  function initScene() {
    // Set the size of the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append the domElement to the DOM
    document.getElementById("webgl-container").appendChild(renderer.domElement);

    // Create a new camera
    camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    // Set the camera position
    camera.position.z = 50;
    camera.position.y = 20;

    // Add the camera to the scene
    scene.add(camera);

    // Create a new ambient light
    light = new THREE.AmbientLight("#cccccc");

    // Add the light to the scene
    scene.add(light);

    // Create a new directional light
    directionalLight = new THREE.DirectionalLight("#ffffff");

    // Add the directional light to the scene
    scene.add(directionalLight);

    // Set up the GUI
    setupGui();

    // Create a new material
    cube = new THREE.Mesh(
      // Create a new box geometry
      new THREE.BoxGeometry(10, 10, 10),
      // Use a bump map for the material
      createMaterialWithBumpMap()
    );
    // Set the position of the cube, the name property, and add it to the scene
    cube.position.set(-10, 20, 0);
    cube.name = "cube";
    scene.add(cube);

    // Create a second mesh
    cube2 = new THREE.Mesh(
      // Make the mesh a box
      new THREE.BoxGeometry(10, 10, 10),
      // Create the material without the bumpmap
      createMaterialWithoutBumpMap()
    );
    // Set the position, name property and add cube2 to the scene
    cube2.position.set(10, 20, 0);
    cube2.name = "cube2";
    scene.add(cube2);

    render();
  }

  // function to create the material without the bumpmap
  function createMaterialWithoutBumpMap() {
    var materialWithoutBumpMap = new THREE.MeshPhongMaterial();
    materialWithoutBumpMap.map = THREE.ImageUtils.loadTexture(texturePath);

    return materialWithoutBumpMap;
  }

  // function to create the material with the bumpmap
  function createMaterialWithBumpMap() {
    // Use a Shiny material, load the texture, bump map, and specify the scale
    var materialWithBumpMap = new THREE.MeshPhongMaterial();
    materialWithBumpMap.map = THREE.ImageUtils.loadTexture(texturePath);
    materialWithBumpMap.bumpMap = THREE.ImageUtils.loadTexture(bumpMapPath);
    materialWithBumpMap.bumpScale = itemsToControl.bumpScale;

    return materialWithBumpMap;
  }

  // function to set up the GUI
  function setupGui() {
    itemsToControl = new function() {
      this.useBumpMap = true;
      this.bumpScale = 2;
      this.rotateCube = "No";

      this.focusOnBumpCube = function() {
        camera.position.x = -10;
        camera.position.z = 20;
        camera.position.y = 20;
      };
    }();

    var gui = new dat.GUI();

    gui.add(itemsToControl, "focusOnBumpCube");

    var useBumpMap = gui.add(itemsToControl, "useBumpMap", ["Yes", "No"]);

    useBumpMap.onChange(function(useBumpMap) {
      updateBumpMap(useBumpMap, itemsToControl.bumpScale);
    });

    var rotateCube = gui.add(itemsToControl, "rotateCube", ["Yes", "No"]);

    rotateCube.onChange(function(value) {
      cubeRotate = value == "Yes";
    });

    var bumpScale = gui.add(itemsToControl, "bumpScale", 0, 10);

    bumpScale.onChange(function(bumpScale) {
      updateBumpMap(itemsToControl.useBumpMap, bumpScale);
    });
  }

  function updateBumpMap(useBumpMap, bumpScale) {
    cube.material.bumpScale = bumpScale;

    if (useBumpMap == "No") {
      cube.material = createMaterialWithoutBumpMap();
    } else {
      cube.material = createMaterialWithBumpMap();
    }

    cube.material.bumpMap.needsUpdate = true;
    cube.material.needsUpdate = true;
  }

  function render() {
    if (cubeRotate) {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      cube2.rotation.x += 0.01;
      cube2.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  window.onload = initScene;

  return {
    scene: scene
  };
})();
