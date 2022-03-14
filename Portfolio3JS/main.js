import './style.css';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Gemetry 

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100)
const material = new  THREE.MeshStandardMaterial( {color:0xff6347 } )
const torus = new THREE.Mesh( geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xFFFFFF)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xFFFFFF)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

// Adding star to the scene
function addStar(){

    const geometry = new THREE.SphereGeometry(0.25, 24,24);
    const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF})
    const star = new THREE.Mesh(geometry,material)

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ))

    star.position.set(x, y, z);
    scene.add(star)
}

Array(200).fill().forEach(addStar)


//Add background to the scene

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture

// Avatar 

const vinciTexture = new THREE.TextureLoader().load('avatar.jpg')

const eu = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial( { map: vinciTexture } )   
)
 
scene.add(eu)
    

//moon
const moonTexture =  new THREE.TextureLoader().load('moon.jpg')
const normalTexture =  new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial( {map: moonTexture, normalMap: normalTexture} )
)


scene.add(moon)



function animate(){
    requestAnimationFrame( animate )

    torus.rotation.x += 0.01
    torus.rotation.y += 0.005
    torus.rotation.z += 0.01

    controls.update();
    
    renderer.render( scene, camera)
}

animate()