window.onload = init;

function init() {
  var stats = initStats();
  var scene = new THREE.Scene();
  // scene.fog = new THREE.Fog(0xffffff, 0.015, 100); //uncomment to use fog

  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  scene.add(camera);

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColorHex(0xEEEEEE);
  renderer.setClearColor(new THREE.Color(0xEEEEEE));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;

  var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1); //width: 60, height: 20
  var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;
  plane.receiveShadow = true;
  scene.add(plane);

  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  var ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  var spotlight = new THREE.SpotLight(0xffffff);
  spotlight.position.set(-40, 60, -10);
  spotlight.castShadow = true;
  scene.add(spotlight);

  var controls = new function() {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
    this.numberOfObjects = 0;

    this.addCube = function() {
      scene.add(createCube());
      this.numberOfObjects = scene.children.length;
    };

    this.toggleMaterial = function() {
      scene.overrideMaterial = scene.overrideMaterial ? null : new THREE.MeshLambertMaterial({ color: 0xffffff });;
    };

    this.removeLastCube = function() {
      var children = scene.children;
      var lastObject = children[children.length - 1];

      if (lastObject instanceof THREE.Mesh) {
        scene.remove(lastObject);
        this.numberOfObjects = scene.children.length;
      }
    };

    this.logObjects = function() {
      console.log(scene.children);
    };
  };
  var gui = new dat.GUI();
  gui.add(controls, 'rotationSpeed', 0, 0.5);
  gui.add(controls, 'addCube');
  gui.add(controls, 'removeLastCube');
  gui.add(controls, 'logObjects');
  gui.add(controls, 'numberOfObjects').listen();
  gui.add(controls, 'toggleMaterial');

  document.getElementById('webgl-output').appendChild(renderer.domElement);

  renderScene();

  window.addEventListener('resize', onResize, false);

  function createCube() {
    var cubeSize = Math.ceil(Math.random() * 3);
    var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.name = `cube ${scene.children.length}`;

    cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
    cube.position.y = Math.round((Math.random()) * 5);
    cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));

    return cube;
  }

  function renderScene() {
    stats.update();

    //animating cube rotation
    scene.traverse(function(e) {
      if (e instanceof THREE.Mesh && e !== plane) {
        var cube = e;

        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;
      }
    });

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  }

  function initStats() {
    var stats = new Stats();

    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById('stats-output').appendChild(stats.domElement);

    return stats;
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
