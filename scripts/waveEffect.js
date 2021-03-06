var example = (function() {
  "use strict";

  var scene = new THREE.Scene(),
    renderer = new THREE.WebGLRenderer(),
    light = new THREE.AmbientLight(0xffffff),
    camera,
    plane,
    ground,
    increase,
    numberOfVerticies,
    isIncreasing = true,
    currentWaveHeight = 1,
    currentRow = 0,
    rowSize = 30,
    maxWaveHeight = 10,
    increaseAmount = 5;

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

    camera.position.z = 400;
    camera.position.y = 10;

    var material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true
    });

    plane = new THREE.Mesh(
      new THREE.PlaneGeometry(150, 150, rowSize, rowSize),
      material
    );
    plane.rotation.x = 320 * (Math.PI / 180);
    plane.position.y = -20;

    numberOfVerticies = plane.geometry.vertices.length;

    scene.add(plane);

    requestAnimationFrame(render);
  }

  function render() {
    //switch wave direction & handle wrapping
    if (isIncreasing && currentWaveHeight >= maxWaveHeight) {
      isIncreasing = false;
    } else if (currentWaveHeight <= 0) {
      isIncreasing = true;

      currentRow += rowSize + 1;

      if (currentRow >= numberOfVerticies - 1) {
        currentRow = 0;
        isIncreasing = true;
      }
    }

    increase = isIncreasing ? increaseAmount : -increaseAmount;

    // Iterating through all the verticies in the mesh and modifying them
    for (var i = currentRow; i <= currentRow + rowSize; i++) {
      plane.geometry.vertices[i].z += increase;
    }

    currentWaveHeight += increase;

    // Anytime you play around with the verticies position, you have to set this to true, otherwise you will not see the results on the screen
    plane.geometry.verticesNeedUpdate = true;

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
