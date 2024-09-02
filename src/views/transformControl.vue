<template>
  <div class="p-r">
    <section id="container"></section>
    <div class="p-a btn-area">
      <el-row>
        <el-button type="primary" @click="handleSwitchTranControl">{{ isTranControlEnable ? '停止' : '启用' }}
          变换控制器</el-button>
        <el-button type="primary" :disabled="!isTranControlEnable" @click="handleSwitchTranControlMode">
          切换变换控制器模式</el-button>
      </el-row>
    </div>
  </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, ref } from "vue";
import { ElMessage } from 'element-plus'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
let scene, renderer, controls, camera, transformControls;
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
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5 });
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh);
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
  transformControls = new TransformControls(camera, renderer.domElement);
  scene.add(transformControls);

  transformControls.mode = 'rotate'
  transformControls.enabled = false;
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
  loadTransformControls()
  animation();
  resizeScreen();
};

onMounted(() => {
  init();
});

const isTranControlEnable = ref(false)
const handleSwitchTranControl = () => {
  isTranControlEnable.value = !isTranControlEnable.value

  if (isTranControlEnable.value) {
    transformControls.attach(scene.children[0])
  } else {
    transformControls.detach()
  }
  transformControls.enabled = isTranControlEnable.value
  controls.enabled = !isTranControlEnable.value
}
const handleSwitchTranControlMode = () => {
  const mode = transformControls.mode === 'rotate' ? 'translate' : transformControls.mode === 'translate' ? 'scale' : 'rotate'
  transformControls.setMode(mode)
  ElMessage(mode)
}


</script>

<style lang="less">
.btn-area {
  top: 10px;
  left: 10px;
}
</style>