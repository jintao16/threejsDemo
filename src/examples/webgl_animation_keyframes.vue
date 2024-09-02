<template>
    <section :id="boxId"></section>
</template>
<script setup>
import { defineComponent, onMounted, ref, reactive, toRefs } from "vue";
import * as THREE from "three";
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

let scene, mesh, renderer, controls, clock, stats, mixer, camera;
const boxId = 'container'


onMounted(() => {

    initSth()
    initRenderer()
    initScene()
    initCamera()
    initController()
    loadGeometry()
    // animation()
})
const initSth = () => {


}
const initRenderer = () => {
    clock = new THREE.Clock();
    stats = new Stats();
    const boxDom = document.getElementById(boxId)
    boxDom.appendChild(stats.dom);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    boxDom.appendChild(renderer.domElement);
};

const initScene = () => {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfe3dd);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(renderer), 0.04).texture;
};

const initCamera = () => {
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        100
    );
    camera.position.set(5, 2, 8); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
};


// 加载控制器
const initController = () => {
    controls = new OrbitControls(
        camera,
        renderer.domElement
    );
    controls.target.set(0, 0.5, 0)
    controls.update()
    controls.enablePan = false
    controls.enableDamping = true
};
// 加载渲染实体
const loadGeometry = () => {
    // ..此处往场景中做对应的添加操作
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('three/examples/jsm/libs/draco/gltf/index.js')
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load('/models/gltf/LittlestTokyo.glb', function (gltf) {
        // const model = gltf.scene;
        // model.position.set(1, 1, 0)
        // model.scale.set(0.01, 0.01, 0.01)
        // scene.add(model)

        // mixer = new THREE.AnimationMixer(model);
        // mixer.clipAction(gltf.animations[0].play())

        // renderer.setAnimationLoop(animation);

    }, undefined, function (e) {
        console.log(e,'333e')
    })
};

// 执行动画
const animation = () => {
    const delta = clock.getDelta()
    mixer.update(delta)
    controls.update()
    stats.update()
    renderer.render(scene, camera);
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
const resizeScreen = () => {
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
}





</script>