<template>
  <section id="container"></section>
</template>
<script setup>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
let scene, renderer, controls, camera;
// 加载场景
const loadScene = () => {
  scene = new THREE.Scene();
};
// 加载相机
const loadCamera = () => {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(10, 30, 20); //设置相机位置
  camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
};
// 加载渲染器
const loadRenderer = () => {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  let container = document.getElementById("container");
  renderer.setClearColor(0xb9d3ff, 1);
  container.appendChild(renderer.domElement);
  renderer.render(scene, camera);
};
// 加载控制器
const loadController = () => {
  controls = new OrbitControls(
    camera,
    renderer.domElement
  );
  controls.addEventListener("change", render);
};
// 加载渲染实体
const loadGeometry = () => {
  // ..此处往场景中做对应的添加操作
};
// 实际要执行的渲染
const render = () => {
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;

  renderer.render(scene, camera);
};
// 执行动画
const animation = () => {
  requestAnimationFrame(animation);
  //   controls && controls.update();
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
const resizeScreen = () => {
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

const loadPlane = () => {
  const texture = new THREE.TextureLoader().load("/textures/floors/FloorsCheckerboard_S_Diffuse.jpg");
  const plate = new THREE.PlaneGeometry(10, 10);

  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    map: texture,
    // transparent: true,
  });
  const mesh = new THREE.Mesh(plate, material);
  mesh.castShadow = true;
  scene.add(mesh);

  const rgbeLoader = new RGBELoader()
  rgbeLoader.load('/img/dji_fly_20240817_173040_223_1723887395927_pano_optimized.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
  })

}
const loadAxesHelper = () => {
  const axes = new THREE.AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 1;
  scene.add(axes);
}
const init = () => {
  loadScene();
  loadCamera();
  loadRenderer();
  loadController();
  loadGeometry();
  loadPlane()
  loadAxesHelper()
  loadPointLight();
  animation();
  resizeScreen();
};
onMounted(() => {
  init();
});


</script>