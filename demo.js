var scene, camera, renderer, WIDTH, HEIGHT;
var PI = Math.PI;
var angle = 0, radius = 10;
var cube;
var cos = Math.cos
var sin = Math.sin;

function init(event) {
  var container = document.getElementById('world')

  WIDTH = window.innerWidth
  HEIGHT = window.innerHeight

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 1, 2000)
  camera.position.z = 100

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })

  renderer.setSize(WIDTH, HEIGHT)

  renderer.setPixelRatio(window.devicePixelRatio || 1)

  container.appendChild(renderer.domElement)

  // create the cube
  var geom = new THREE.CubeGeometry(16, 8, 8, 1)
  var material = new THREE.MeshStandardMaterial({
    color: 'orange'
  })

  cube = new THREE.Mesh(geom, material)

  scene.add(cube)

  // Create and add a light source.
  var globalLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(globalLight);

  // Listen to the window resize.
  window.addEventListener('resize', handleWindowResize, false);

  loop()
}

function handleWindowResize() {
  // If the window is resized, we have to update the camera aspect ratio.
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

function loop(){
  // Call the update function in each frame to update the cube position.
  update();
  createHero()


  // Render the scene in each frame.
  renderer.render(scene, camera);

  // Call the loop function in next frame.
  requestAnimationFrame(loop);
}

function update(){
  // The angle is incremented by 0.1 every frame. Try higher values for faster animation.
  angle += .1;

  // Try modifying the angle and/or radius for a different movement.
  cube.position.x = cos(angle) * radius;
  // cube.position.y = sin(angle) * radius;

  // You might want to use the same principle on the rotation property of an object. Uncomment the next line to see what happens.
  //cube.rotation.z = cos(angle) * PI/4;

  //Or vary the scale. Note that 1 is added as an offset to avoid a negative scale value.
  //cube.scale.y = 1 + cos(angle) * .5;

  /*
  Your turn! You might want to:
  - comment or uncomment the lines above to try new combinations,
  - replace cos by sin and vice versa,
  - replace radius with an other cyclic function.
  For example :
  cube.position.x = cos(angle) * (sin(angle) *radius);
  ...

  */
}

var blueMat = new THREE.MeshPhongMaterial({
  color: 'blue',
  shininess: 0,
  shading: THREE.FlatShading,
});

var brownMat = new THREE.MeshPhongMaterial({
  color: 0xb44b39,
  shininess: 0,
  shading: THREE.FlatShading,
});

var Hero = function() {
  // This will be incremented later at each frame and will be used as the rotation angle of the cycle.
  this.runningCycle = 0;

  // Create a mesh that will hold the body.
  this.mesh = new THREE.Group();
  this.body = new THREE.Group();
  this.mesh.add(this.body);

  // Create the different parts and add them to the body.
  var torsoGeom = new THREE.CubeGeometry(8,8,8, 1);//
  this.torso = new THREE.Mesh(torsoGeom, blueMat);
  this.torso.position.y = 8;
  this.torso.castShadow = true;
  this.body.add(this.torso);

  var handGeom = new THREE.CubeGeometry(3,3,3, 1);
  this.handR = new THREE.Mesh(handGeom, brownMat);
  this.handR.position.z=7;
  this.handR.position.y=8;
  this.body.add(this.handR);

  this.handL = this.handR.clone();
  this.handL.position.z = - this.handR.position.z;
  this.body.add(this.handL);

  var headGeom = new THREE.CubeGeometry(16,16,16, 1);//
  this.head = new THREE.Mesh(headGeom, blueMat);
  this.head.position.y = 21;
  this.head.castShadow = true;
  this.body.add(this.head);

  var legGeom = new THREE.CubeGeometry(8,3,5, 1);

  this.legR = new THREE.Mesh(legGeom, brownMat);
  this.legR.position.x = 0;
  this.legR.position.z = 7;
  this.legR.position.y = 0;
  this.legR.castShadow = true;
  this.body.add(this.legR);

  this.legL = this.legR.clone();
  this.legL.position.z = - this.legR.position.z;
  this.legL.castShadow = true;
  this.body.add(this.legL);

  // Ensure that every part of the body casts and receives shadows.
  this.body.traverse(function(object) {
    if (object instanceof THREE.Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
}


function createHero() {
  hero = new Hero();
  scene.add(hero.mesh);
}

// Initialize the demo when the page is loaded.
window.addEventListener('load', init, false);

