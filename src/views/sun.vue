<template>
  <section id="container"></section>
</template>
<script setup>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ro } from "element-plus/es/locales.mjs";
let scene, mesh;
const rotations = []

const da = reactive({
  renderer: "",
  controls: "",
  camera: "",
  requestID: "",
});
const circular = reactive({
  radius: 1,
  widthSegments: 20,
  heightSegments: 20,
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
  da.camera.position.set(0, 50, 0); //设置相机位置
  da.camera.up.set(0, 0, 1)
  da.camera.lookAt(0, 0, 0); //设置相机方向(指向的场景对象)
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
  da.controls.addEventListener("change", render);
};
// 加载渲染实体
const loadGeometry = () => {
  const axes = new THREE.AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 1;


  const sunEarthScene = new THREE.Group();
  scene.add(sunEarthScene);
  rotations.push(sunEarthScene);

  const earthMoonScene = new THREE.Group();
  sunEarthScene.add(earthMoonScene);
  rotations.push(earthMoonScene)

  const sphereGeometry = new THREE.SphereGeometry(
    circular.radius,
    circular.widthSegments,
    circular.heightSegments
  );
  const sunMaterial = new THREE.MeshStandardMaterial({ emissive: 0xffff00 });
  const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
  sun.scale.set(5, 5, 5)
  sun.add(axes);
  sunEarthScene.add(sun);
  rotations.push(sun)


  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244,
  });
  const earth = new THREE.Mesh(sphereGeometry, earthMaterial)
  earth.scale.set(1.5, 1.5, 1.5)

  // earth.position.x = 15;
  sun.add(axes);

  earthMoonScene.add(earth);

  rotations.push(earth)

  const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0x888888,
    emissive: 0x222222,
  });
  const moon = new THREE.Mesh(sphereGeometry, moonMaterial)
  moon.scale.set(0.5, 0.5, 0.5)
  moon.position.x = 3;
  earthMoonScene.add(moon)
  // rotations.push(moon)
  earthMoonScene.position.x = 14
};
// 实际要执行的渲染
const render = () => {
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;


};

// 执行动画
const animation = () => {

  da.controls && da.controls.update();
  // rotations.forEach((obj) => {
  //   obj.rotation.y += 0.01
  // });
  da.renderer.render(scene, da.camera);
  requestAnimationFrame(animation);

};
// 光源设置
const loadPointLight = () => {
  /**
   * 光源设置
   */
  //点光源
  var point = new THREE.PointLight(0xffffff, 0.1);
  point.position.set(0, 0, 0); //点光源位置
  scene.add(point); //点光源添加到场景中
  //环境光
  var ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);
};
const resizeScreen = () => {
  window.addEventListener("resize", () => {
    da.renderer.setSize(window.innerWidth, window.innerHeight);
    da.camera.aspect = window.innerWidth / window.innerHeight;
    da.camera.updateProjectionMatrix();
  });
}
const init = () => {
  loadScene();
  loadCamera();
  loadRenderer();
  loadController();
  loadGeometry();
  loadPointLight();
  animation();
  resizeScreen();
};
onMounted(() => {
  init();
});


</script>