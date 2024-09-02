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
    initFloor();
    loadGeometry()
    animate();
    resizeWindow()
})
/**
 *  初始化场景
 */
const initScene = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);//指数衰减雾
}
/**
 *  初始化相机
 */
const initCamera = () => {
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(60, aspect, 1, 1000);
    camera.position.set(100, 50, 0)
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
    controls.minDistance = 100;
    controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI / 2;
    controls.autoRotate = true
    controls.autoRotateSpeed = 1
}

const loadGeometry2 = () => {

    // 开始设置立方体,设置长宽高，立方体的框架
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    // 设置渲染材质，这个变量用来渲染立方体的表面。设置立方体的颜色为绿色。立方体的表面材质
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // 真正的立方体变量，通过THREE.Mesh来将材质和框架混合到一起
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube)



}

const loadGeometry = () => {
    const geometry = new THREE.BoxGeometry(2, 1, 1)
    geometry.translate(0, 0.5, 0)
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true, shininess: 150, });

    for (let i = 0; i < 100; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random() * 100 - 50, 0, Math.random() * 100 - 50)
        // mesh.scale.x = 2
        mesh.scale.y = Math.random() * 20 + 1
        // mesh.scale.z = 20
        mesh.updateMatrix()
        mesh.matrixAutoUpdate = false
        mesh.receiveShadow = true;
        mesh.castShadow = true
        scene.add(mesh);
    }
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


const resizeWindow = () => {
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight

        camera.updateProjectionMatrix();
    })
}





</script>