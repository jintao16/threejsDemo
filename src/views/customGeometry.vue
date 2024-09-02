<template>
    <section id="container"></section>
</template>
<script setup>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
let scene, mesh;

const da = reactive({
    renderer: "",
    controls: "",
    camera: "",
    requestID: "",
});
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
    da.camera.position.set(2, 3, 2); //设置相机位置
    da.camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
};
// 加载渲染器
const loadRenderer = () => {
    da.renderer = new THREE.WebGLRenderer();
    da.renderer.setSize(window.innerWidth, window.innerHeight);
    let container = document.getElementById("container");
    da.renderer.setClearColor(0xb9d3ff, 1);
    container.appendChild(da.renderer.domElement);
    da.renderer.render(scene, da.camera);
};
// 加载控制器
const loadController = () => {
    da.controls = new OrbitControls(
        da.camera,
        da.renderer.domElement
    );
    da.controls.autoRotate = true;
    da.controls.autoRotateSpeed = 2.0;
    da.controls.addEventListener("change", render);
};
// 加载渲染实体
const loadGeometry = () => {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, -1.0, 1.0,
    ]);
    const positionAttribute = new THREE.BufferAttribute(vertices, 3);
    geometry.setAttribute("position", positionAttribute);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
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
    da.controls.update()
    render();
};
// 光源设置
const loadPointLight = () => {
    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
};
const init = () => {
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