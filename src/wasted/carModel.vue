<template>
  <section id="container"></section>
</template>
<script setup>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
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
  da.camera.position.set(50, 50, 1); //设置相机位置
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
  da.controls.addEventListener("change", render);
};
// 加载渲染实体
const loadGeometry = () => {
  // ..此处往场景中做对应的添加操作
};
// 实际要执行的渲染
const render = () => {
  if (mesh.rotation) {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
  }

  da.renderer.render(scene, da.camera);
};
// 执行动画
const animation = () => {
  da.requestID = requestAnimationFrame(animation);
  da.controls.update();
  render();
};
// 光源设置
const loadPointLight = () => {
  /**
   * 光源设置
   */
  //点光源
  var point = new THREE.PointLight(0xffffff);
  point.position.set(50, 50, 1); //点光源位置
  scene.add(point); //点光源添加到场景中
  //环境光
  var ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);
};
const initLoader = async () => {
  // const loader = new GLTFLoader();
  // const carLoader = await loader.loadAsync('/models/BoomBox.glb')
  // scene.add(carLoader.scene.children[0])

  const loader2 = new OBJLoader()
  loader2.load('/models/che.obj', (obj) => {
    obj.position.set(0, 0, 0)

    console.log(obj)
    mesh = obj
    scene.add(obj)
  })

}
const init = () => {
  loadScene();
  loadCamera();
  loadRenderer();
  loadController();
  loadGeometry();
  loadPointLight();
  initLoader()
  animation();
};
onMounted(() => {
  init();
});


</script>