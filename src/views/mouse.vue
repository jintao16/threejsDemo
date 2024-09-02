<template>
    <section id="container"></section>
</template>
<script setup>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import linkco from './yuan.jpg'
let scene, mesh;

const da = reactive({
    renderer: "",
    controls: "",
    camera: "",
    requestID: "",
});
const cursor = reactive({
    x: 0,
    y: 0,
})
// 加载场景
const loadScene = () => {
    scene = new THREE.Scene();
};
// 加载相机
const loadCamera = () => {
    da.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    da.camera.position.set(20, 30, 20); //设置相机位置
    da.camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
};
// 加载渲染器
const loadRenderer = () => {
    da.renderer = new THREE.WebGLRenderer();
    da.renderer.setSize(window.innerWidth, window.innerHeight);
    let container = document.getElementById("container");
    da.renderer.setClearColor(0xb9d3ff, 1);
    da.renderer.shadowMap.enabled = true;
    container.appendChild(da.renderer.domElement);
    da.renderer.render(scene, da.camera);

};
// 加载控制器
const loadController = () => {
    da.controls = new OrbitControls(
        da.camera,
        da.renderer.domElement
    );
    da.controls.enablePan = true;
    // da.controls.maxAzimuthAngle = Math.PI * 0.5;
    // da.controls.minAzimuthAngle = Math.PI * 0.4;
    // da.controls.maxPolarAngle = Math.PI * 0.5;
    // da.controls.minPolarAngle = Math.PI * 0.25;
    da.controls.addEventListener("change", render);
};
// 加载渲染实体
const loadGeometry = async () => {
    const texLoader = new THREE.TextureLoader();

    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshPhongMaterial({
        map: texLoader.load('https://threejs.org/examples/textures/crate.gif'),
        // color: 0xffffff
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;

    scene.add(mesh);


};
// 实际要执行的渲染
const render = () => {
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    da.renderer.render(scene, da.camera);
};
// 执行动画
const animation = () => {
    da.requestID = requestAnimationFrame(animation);
    da.camera.position.x = cursor.x * 100
    da.camera.position.y = cursor.y * 100 // 为了让效果更明显，我们乘以一个常量系数
    da.camera.lookAt(mesh.position)

    render();
};
// 光源设置
const loadPointLight = () => {
    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight(0xffffff, 10);
    point.position.set(100, 100, 100); //点光源位置
    point.decay = 0.1;

    point.castShadow = true;
    scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444, 10);
    scene.add(ambient);
};
const initMousePosition = () => {
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    window.addEventListener('mousemove', (event) => {
        cursor.x = event.clientX / sizes.width - 0.5
        cursor.y = - (event.clientY / sizes.height - 0.5)
    })

};
const init = () => {
    initMousePosition()
    loadScene();
    loadCamera();
    loadRenderer();
    loadController();
    loadGeometry();
    loadPointLight();
    animation();
};
onMounted(() => {
    init();
});


</script>