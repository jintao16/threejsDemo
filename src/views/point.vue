<template>
    <section id="container"></section>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
let scene, mesh;
export default defineComponent({
    setup() {
        const state = reactive({
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
            state.camera = new THREE.PerspectiveCamera(
                45,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            state.camera.position.set(200, 300, 200); //设置相机位置
            state.camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        };
        // 加载渲染器
        const loadRenderer = () => {
            state.renderer = new THREE.WebGLRenderer();
            state.renderer.setSize(window.innerWidth, window.innerHeight);
            let container = document.getElementById("container");
            state.renderer.setClearColor(0xb9d3ff, 1);
            container.appendChild(state.renderer.domElement);
            state.renderer.render(scene, state.camera);
        };
        // 加载控制器
        const loadController = () => {
            state.controls = new OrbitControls(
                state.camera,
                state.renderer.domElement
            );

            state.controls.addEventListener("change", render);
        };
        // 加载渲染实体
        const loadGeometry = () => {
            const geometry = new THREE.SphereGeometry(100, 50, 30);
            const material = new THREE.PointsMaterial({
                size: 2,
                color: 0x000ff0,
            });
            // const points = new THREE.Points(geometry, material); //点
            const line = new THREE.Line(geometry, material); // 线
            mesh = line
            scene.add(line);
        };
        // 实际要执行的渲染
        const render = () => {
            mesh.rotation.x += 0.002;
            mesh.rotation.y += 0.002;
            state.renderer.render(scene, state.camera);
        };
        // 执行动画
        const animation = () => {
            state.requestID = requestAnimationFrame(animation);
            render();
        };
        // 光源设置
        const loadPoint = () => {
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
        // 光源设置
        const initAmbientLight = () => {
            // state.point = new THREE.PointLight(0xffffff);
            // state.point.position.set(400, 200, 300); //点光源位置
            var ambient = new THREE.AmbientLight(0x444444);
            scene.add(ambient);
        };
        const init = () => {
            loadScene();
            loadCamera();
            loadRenderer();
            loadController();
            loadGeometry();
            initAmbientLight();
            animation();
        };
        onMounted(() => {
            init();
        });
        return {
            ...toRefs(state),
        };
    },
});
</script>