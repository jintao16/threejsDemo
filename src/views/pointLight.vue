<template>
  <section id="container"></section>
</template>
<script setup>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
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
  camera.position.set(10, 10, 10); //设置相机位置
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

  renderer.shadowMap.enabled = true;

  const container = document.getElementById("container");
  // renderer.setClearColor(0xb9d3ff, 1);
  container.appendChild(renderer.domElement);
  renderer.render(scene, camera);
};
// 加载控制器
const loadController = () => {
  controls = new OrbitControls(
    camera,
    renderer.domElement
  );
  controls.autoRotate = true
  controls.autoRotateSpeed = 3

  controls.addEventListener("change", render);
};
// 加载渲染实体
const loadGeometry = () => {
  // const geometry = new THREE.BoxGeometry(1, 10, 1);
  // const material = new THREE.MeshPhongMaterial({ color: 0xffffff, opacity: 0.5 });
  // const mesh = new THREE.Mesh(geometry, material)
  // mesh.receiveShadow = true;
  // mesh.castShadow = true;
  // scene.add(mesh);

  const gltfLoader = new GLTFLoader();
  gltfLoader.load('/models/BoomBox.glb', (gltf) => {
    console.log(gltf)
    // scene.add(...gltf.scene.children);
    scene.add(gltf.scene);
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    })
    gltf.scene.scale.set(200, 200, 200)
    gltf.scene.position.y = 1.5
  },
    undefined, // 加载进度回调函数
    function (error) {
      console.error(error); // 错误处理
    })
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
  var point = new THREE.PointLight(0xffffff, 8, 80);
  point.position.set(30, 30, 10); //点光源位置
  point.decay = 0.2;
  point.castShadow = true;
  point.shadow.mapSize.width = 1024;
  point.shadow.mapSize.height = 1024;
  point.shadow.camera.near = 0.5;
  point.shadow.camera.far = 500;

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
const loadFloor = () => {
  const mesh = new THREE.Mesh(
    new THREE.CircleGeometry(8, 20),//半径，分割数
    new THREE.MeshPhongMaterial({ color: 0xffffff, })
  );
  mesh.rotation.x = -Math.PI / 2;  //默认是竖着的旋转至平放
  mesh.receiveShadow = true;
  scene.add(mesh);
}
const init = () => {
  loadScene();
  loadCamera();
  loadRenderer();
  loadController();
  loadGeometry();
  // loadAmbientLight();
  loadPointLight()
  loadAxesHelper()
  loadFloor()
  // loadGridHelper()

  // loadTransformControls()
  animation();
  resizeScreen();
};

onMounted(() => {
  init();
});


</script>