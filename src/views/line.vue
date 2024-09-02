<template>
    <main class="app-container">
        <section id="container"></section>
    </main>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const da = reactive({
    container: null,
})
let scene, camera, renderer, controls, meshFloor
onMounted(() => {
    initScene();
    initCamera();
    initRenderer();
    initControls();
    initLight();
    // initFloor();
    loadGeometry()
    animate();
})
/**
 *  初始化场景
 */
const initScene = () => {
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xcccccc);
    // scene.fog = new THREE.FogExp2(0xcccccc, 0.002);//指数衰减雾
}
/**
 *  初始化相机
 */
const initCamera = () => {
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(60, aspect, 1, 1000);
    camera.position.set(1, 1, 0)
}

const initRenderer = () => {
    da.container = document.getElementById("container");
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    da.container.appendChild(renderer.domElement);
}

const initControls = () => {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 2;
    controls.autoRotate = true
    controls.autoRotateSpeed = 1
}

const loadGeometry = () => {

    var material = new THREE.LineBasicMaterial({ color: 0xffffff });
    var geometry = new THREE.BufferGeometry();
    const pointsArray = new Array()
    for (let i = 0; i < 1000; i++) {
        const x = Math.random() * 2 - 1; //范围在-1到1
        const y = Math.random() * 2 - 1;
        const z = Math.random() * 2 - 1;
        pointsArray.push(new THREE.Vector3(x, y, z));
    }
    geometry.setFromPoints(pointsArray)

    const line = new THREE.Line(geometry, material);
    scene.add(line);

}



const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

const initFloor = () => {
    const meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshPhongMaterial({
            color: 0x0000ff,

        })
    );
    meshFloor.rotation.x -= Math.PI / 2;
    meshFloor.receiveShadow = true;

    scene.add(meshFloor);
}

const initLight = () => {
    const aimLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(aimLight);

    const spotLight = new THREE.SpotLight(0xffffff, 50, 100)
    spotLight.decay = 0.1;
    spotLight.position.set(50, 50, 20);
    spotLight.castShadow = true;
    scene.add(spotLight);
}








</script>