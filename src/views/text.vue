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
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import helvetiker_regular from '../../public/helvetiker_bold.typeface.json'
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
      const aspectRatio = window.innerWidth / window.innerHeight
      state.camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)


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
      if (textObj) {
        // textObj.rotation.x += 0.01;
        textObj.rotation.y += 0.01;
      }
      state.renderer.render(scene, state.camera);
    };


    const loadGeometry = () => {
      new FontLoader().load('../../public/helvetiker_bold.typeface.json', function (font) {
        const textGeometry = new TextGeometry(
          'Hello Three.js',
          {
            font: font,
            size: 1, // 表示文本大小，即字体高度，默认为 100
            height: 0.2, // 表示文本厚度，默认为 50
            curveSegments: 12, // 表示圆角段数，默认为 12
            bevelEnabled: true,// 表示是否启用斜角，默认为 false
            bevelThickness: 0.011, // 表示斜角的深度，默认为 10
            bevelSize: 0.01, // 表示斜角的高度，默认为 8
            bevelOffset: 0, // 表示斜角相对于文本的偏移量，默认为 0
            bevelSegments: 1 // 表示斜角的段数，默认为 3
          }
        )
        textGeometry.computeBoundingBox();
        textGeometry.translate(
          - textGeometry.boundingBox.max.x * 0.5,
          - textGeometry.boundingBox.max.y * 0.5,
          - textGeometry.boundingBox.max.z * 0.5,
        )
        const textMaterial = new THREE.MeshBasicMaterial()
        const textMesh = new THREE.Mesh(textGeometry, textMaterial)
        textObj = textMesh
        scene.add(textMesh)
      })


      // })
      // state.renderer.render(scene, state.camera);
    };
    const initControllers = () => {
      state.controls = new OrbitControls(state.camera, state.renderer.domElement);
      // state.controls.addEventListener('change', render);
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