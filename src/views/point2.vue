<template>
    <div id="container"></div>
</template>
<script>
import {
    defineComponent,
    onBeforeMount,
    onMounted,
    reactive,
    toRefs,
} from "vue";
import * as THREE from "three";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
let scene, textObj;
export default defineComponent({
    setup() {
        const state = reactive({
            renderer: "",
            requestID: "",
            controls: ""
        });
        onMounted(() => {
            init();
        });
        onBeforeMount(() => {
            // 页面跳转的时候停止RAF
            window.cancelAnimationFrame(state.requestID);
        });
        // 创建相机
        const initCamera = () => {
            // 创建相机
            state.camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            state.camera.position.z = 5;
            state.camera.position.x = 0;
        };
        // 创建渲染器
        const initRenderer = () => {
            state.renderer = new THREE.WebGLRenderer();
            state.renderer.setSize(window.innerWidth, window.innerHeight);
            let container = document.getElementById("container");
            state.renderer.setClearColor(0xb9d3ff, 1);
            container.appendChild(state.renderer.domElement);
        };
        // 执行动画
        const animate = () => {
            state.requestID = requestAnimationFrame(animate);
            render();
        };

        // 具体用来调用的动画
        const render = () => {
            // textObj.rotation.x += 0.01;
            // textObj.rotation.y += 0.01;
            state.renderer.render(scene, state.camera);
        };
        const loadGeometry = () => {
            const geometries = new THREE.SphereGeometry(1, 32, 32)
            const material = new THREE.PointsMaterial({
                color: 0xffffff,
                size: 0.05
            });
            const point = new THREE.Points(geometries, material)
            scene.add(point)
        };
        const initControllers = () => {
            state.controls = new OrbitControls(state.camera, state.renderer.domElement);
            state.controls.addEventListener('change', render);
        }
        const init = () => {
            //加载场景
            scene = new THREE.Scene();
            // 加载相机
            initCamera();
            // 加载渲染器
            initRenderer();
            // 加载物体材质
            loadGeometry();
            initControllers();
            animate();
        };
        return {
            ...toRefs(state),
        };
    },
});
</script>