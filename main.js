//#region Basic three js
import "./style.css";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth/2, window.innerHeight/2);
document.body.appendChild(renderer.domElement);


const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);
// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(5, 5, -5);
scene.add(directionalLight);
// scene.background = new THREE.Color(0xAAAAAA);


let video = document.getElementById("phoneVideo");
var videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
let videoMaterial = new THREE.MeshBasicMaterial({
  map: videoTexture,
  side: THREE.FrontSide,
  toneMapped: false,
});
const gltfLoader = new GLTFLoader();
var phoneModel;
var macModel;

//Adding phone to scene
gltfLoader.load('Iphone14pro.gltf', (gltfScene) => {
  phoneModel = gltfScene.scene;
  phoneModel.traverse((e) => {
    if (e.name == "_Screen") {
      e.material = videoMaterial;
    }
  });
  phoneModel.position.set(2,0,-2.5);
  phoneModel.rotateY(-0.7);
  scene.add(gltfScene.scene);
});

//Adding mac to scene
gltfLoader.load('MacBookAir.gltf', (gltfScene) => {
  macModel = gltfScene.scene;
  macModel.traverse((e) => {
    if (e.name == "_Screen") {
      e.material = videoMaterial;
    }
  });
  macModel.position.set(0,-1,-2.5);
  macModel.rotateY(0.7);
  scene.add(gltfScene.scene);
});

video.play();
//test


//controls.update() must be called after any manual changes to the camera's transform
//camera.position.set( 0, 20, 100 );



camera.position.z = 1;
//#endregion



function animate() {
  requestAnimationFrame(animate);
  videoTexture.needsUpdate = true;

  renderer.render(scene, camera);
  //model.rotation.y+=0.01;
}
animate();