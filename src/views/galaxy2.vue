<template>
  <section id="container"></section>
</template>
<script setup>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
let scene, renderer, controls, camera;
const containerHeight = window.innerHeight - 60;
const containerWidth = window.innerWidth;
// 加载场景
const loadScene = () => {
  scene = new THREE.Scene();
};
// 加载相机
const loadCamera = () => {
  camera = new THREE.PerspectiveCamera(
    45,
    containerWidth / containerHeight,
    0.1,
    1000
  );
  camera.position.set(30, 20, 30); //设置相机位置
  // camera.lookAt(new THREE.Vector3(0, 0, 100)); //设置相机位置
  // camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
};
// 加载渲染器
const loadRenderer = () => {
  renderer = new THREE.WebGLRenderer({
    antialias: true//抗锯齿
  });
  renderer.setPixelRatio(window.devicePixelRatio);// 适配高清屏
  renderer.setSize(containerWidth, containerHeight);

  const container = document.getElementById("container");
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
  // controls.target = new THREE.Vector3(1, 3, 5);
  controls.addEventListener("change", render);
};
// 加载渲染实体
const loadGeometry = () => {
  // ..此处往场景中做对应的添加操作

  const positions = []
  for (let i = 1; i < 1000; i++) {
    positions.push(
      Math.random() * 20 - 10,
      Math.random() * 20 - 3,
      Math.random() * 20 - 10
    )
  }
  // const positions = new Float32Array(600)
  // for (let i = 0; i < 600; i++) {
  //   positions[i] = Math.random() * 20 - 4;
  // }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  const textureLoader = new THREE.TextureLoader()
  const circleTexture = textureLoader.load('/skin/sphere.png')

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5,
    map: circleTexture,
    transparent: true,
    alphaTest: 0.5
  })
  scene.add(new THREE.Points(geometry, material))

};
const loadGridHelper = () => {
  const gridHelper = new THREE.GridHelper(30, 30, new THREE.Color(0x888888), new THREE.Color(0x888888));
  const gridHelper2 = new THREE.GridHelper(30, 6, 0x000000, 0x000000);
  scene.add(gridHelper);
  scene.add(gridHelper2);
}
// 实际要执行的渲染
const render = () => {
  renderer.render(scene, camera);
};
// 执行动画
const animation = () => {
  render();
  controls && controls.update();
  requestAnimationFrame(animation);
};

/**
 * 环境光光源设置
 */
const loadAmbientLight = () => {
  //环境光
  var ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);
};
// 点光源
const loadPointLight = () => {
  /**
   * 光源设置
   */
  //点光源
  var point = new THREE.PointLight(0xffffff);
  point.position.set(400, 200, 300); //点光源位置
  scene.add(point); //点光源添加到场景中

};
/*
 * 窗口尺寸变化更新渲染器尺寸
 */
const resizeScreen = () => {
  window.addEventListener("resize", () => {
    renderer.setSize(containerWidth, containerHeight);
    camera.aspect = containerWidth / containerHeight;
    camera.updateProjectionMatrix();
  });
}
/*
 * 坐标辅助线
 */
const loadAxesHelper = () => {
  const axes = new THREE.AxesHelper(5);
  axes.material.depthTest = false;
  axes.renderOrder = 1;
  scene.add(axes);
}

const loadTransformControls = () => {
  const transformControls = new TransformControls(camera, renderer.domElement);
  scene.add(transformControls);
  transformControls.attach(scene.children[0])
  transformControls.mode = 'rotate'
  controls.enabled = false;
}
const init = () => {
  loadScene();
  loadCamera();
  loadRenderer();
  loadController();
  loadGeometry();
  loadAmbientLight();
  loadAxesHelper()
  loadGridHelper()
  // loadTransformControls()
  animation();
  resizeScreen();
};

onMounted(() => {
  init();
});


</script>