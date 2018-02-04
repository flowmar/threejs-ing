var stats,
  scene,
  renderer,
  camera;

function init() {

  stats = initStats();

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000 );

renderer = new THREE.WebGLRenderer();

renderer.setClearColor(new THREE.Color(0xeeeeee, 1.0));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;


var planeGeometry = new THREE.PlaneGeometry( 60, 40, 1, 1 );
var planeMaterial = new THREE.MeshLambertMaterial( {
 color: 0xffffff
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

// Rotate and position the plane
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;

scene.add(plane);

camera.position.x = -50;
camera.position.y = 30;
camera.position.z = 20;
camera.lookAt(new THREE.Vector3(-10, 0, 0));

var ambientLight = new THREE.AmbientLight( 0x999999 );
scene.add(ambientLight);

// Add spotlight for shadow effects
var spotLight = new THREE.SpotLight( 0xffffff);
spotLight.position.set(-40, 40, 50);
spotLight.castShadow = true;
scene.add(spotLight);

addGeometries(scene);

document.getElementById('webgl-container').appendChild(renderer.domElement);

var step = 0;

render();

}
function addGeometries(scene) {
  var geoms = [];

  geoms.push(new THREE.CylinderGeometry( 1, 4, 4));

  geoms.push(new THREE.BoxGeometry(2, 2, 2));

  geoms.push(new THREE.SphereGeometry(2));

  geoms.push(new THREE.IcosahedronGeometry( 4));

  // Convex shape
  var points = [
    new THREE.Vector3( 2, 2, 2 ),
    new THREE.Vector3( 2, 2, -2 ),
    new THREE.Vector3( -2, 2, -2 ),
    new THREE.Vector3( -2, 2, 2 ),
    new THREE.Vector3( 2,- 2, 2 ),
    new THREE.Vector3( 2, -2,-2 ),
    new THREE.Vector3(-2,-2, 2 ),
    
  ]

geoms.push(new THREE.ConvexGeometry(points));

//! Create a lathgeometry

var pts = []; //? points array, path profile points are stored here

var detail = .1; //? half-circle detail : how many angle increments will be used to generate the points

var radius = 3; //? radius for our half-sphere

//? Loop from 0 to PI(0 to 180 degrees)
for (var angle = 0.0; angle < Math.PI; angle += detail){
  pts.push(new THREE.Vector3(Math.cos(angle)* radius, 0, Math.sin(angle) * radius));

  geoms.push(new THREE.LatheGeometry(pts, 12));

  //! Create a Octahedron Geometry
  geoms.push(new THREE.OctahedronGeometry(3));

  //! Create a geometry based on a function
  geoms.push(new THREE.ParametricGeometry(THREE.ParametricGeometries.mobius3d, 20, 10));

  geoms.push(new THREE.TetrahedronGeometry(3));

  geoms.push(new THREE.TorusGeometry(3, 1, 10, 10));

  geoms.push(new THREE.TorusKnotGeometry(3, 0.5, 50, 20));

  var j = 0;
  for (var i = 0; i < geoms.length; i++){
    var cubeMaterial = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
      wireframe: true
    });

    var materials = [

      new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff,
        shading: THREE.FlatShading}),
        new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff,
        wireframe: true
      })

    ];

    var mesh = THREE.SceneUtils.createMultiMaterialObject(
      geoms[i], materials
    );
    mesh.traverse(function(e) {
      e.castShadow = true
    });


                //var mesh = new THREE.Mesh(geoms[i],materials[i]);
                //mesh.castShadow=true;
                mesh.position.x = -24 + ((i % 4) * 12);
                mesh.position.y = 4;
                mesh.position.z = -8 + (j * 12);

                if ((i + 1) % 4 == 0) j++;
                scene.add(mesh);
            }

  }}

function render() {

  stats.update();

  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function initStats() {

  var stats = new Stats();

  stats.setMode(0); // 0: fps, 1: ms

  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.getElementById("stats-output").appendChild(stats.domElement);

  return stats;
}

window.onload = init;
