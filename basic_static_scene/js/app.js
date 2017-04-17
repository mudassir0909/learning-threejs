window.onload = init;

function init() {
  var scene = new THREE.Scene(); //container for all objects & lights that we want to render
  // an object that defines, what we'll see when we render the scene
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

  //does the math of how the scene will look like based on camera's angle
  var renderer = new THREE.WebGLRenderer(); //WebGLRenderer => use graphics card to render
  renderer.setClearColorHex(0xEEEEEE);
  renderer.setClearColor(new THREE.Color(0xEEEEEE)); //setting background color of the scene
  renderer.setSize(window.innerWidth, window.innerHeight); //fit entire available width & height

  // adds helper axes
  var axes = new THREE.AxisHelper(20);
  scene.add(axes);

  // hepler plane
  var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1); //width: 60, height: 20
  var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -0.5 * Math.PI; //rotate 90 degress around X-axis
  //👇 in the second chapter
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  scene.add(plane);

  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;

  scene.add(cube);

  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff, wireframe: true });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  sphere.position.x = 20;
  sphere.position.y = 4;
  sphere.position.z = 2;

  scene.add(sphere);

  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  document.getElementById('webgl-output').appendChild(renderer.domElement);

  renderer.render(scene, camera);
}
