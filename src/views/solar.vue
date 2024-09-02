<template>
  <div class="p-r w-100 h-100">
    <section id="container" class="w-100 h-100"></section>
    <div class="params-control p-a">
      <el-button @click="da.isDrawerShow = true">调整参数</el-button>

    </div>
    <el-drawer v-model="da.isDrawerShow" title="标题" direction="ttb">
      <el-row class="m-b-15">
        <el-col :span="6">
          <span class="m-r-10">天文单位缩小</span>
          <el-input-number v-model="au.scale" :min="0.001" :step="0.001" :max="1" @change="handleChange" />
        </el-col>
        <el-col :span="6">
          <span class="m-r-10">太阳尺寸缩小</span>
          <el-input-number v-model="sunRef.scale" :min="0.01" :step="0.01" :max="1" @change="updateSunSize" />
        </el-col>
        <el-col :span="6">
          <!-- <el-button @click="switchCenter">
          切换中心为地球
        </el-button> -->

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" class="d-f a-i-c">
          <span class="m-r-10">公转地球年</span>
          <el-radio-group v-model="da.yearTime" class="m-r-10">
            <el-radio-button label="10秒" :value="10000" />
            <el-radio-button label="20秒" :value="20000" />
            <el-radio-button label="1年" :value="365.25 * 24 * 60 * 60 * 1000" />
          </el-radio-group>
          <el-input-number v-model="da.yearTime" :min="1" :step="1" :max="365.25 * 24 * 60 * 60 * 1000"
            @change="handleChange" />
        </el-col>

      </el-row>


    </el-drawer>
  </div>
</template>
<script setup>
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
let scene, mesh;
const rotations = [] //自转的天体

const da = reactive({
  renderer: "",
  controls: "",
  camera: "",
  requestID: "",
  isDrawerShow: false,
  yearTime: 20000,//调节地球年为20s
});

const auDistance = computed(() => {
  return au.distance * au.scale
})//距离缩小一千倍，不然看不到
const au = reactive({
  distance: 149597870,
  scale: 0.001
})

const planetArr = computed(() => {
  return [
    {
      name: 'mercury',
      radius: 2439.7,
      distance: 0.39 * auDistance.value,
      texture: '/skin/mercury-skin.jpg',
      period: 0.24088,
      rotation: 58.646
    },
    {
      name: 'venus',
      radius: 6051.8,
      distance: 0.72 * auDistance.value,
      texture: '/skin/venus-skin.jpg',
      period: 0.615,
      rotation: 243.02
    },
    {
      name: 'earth',
      radius: 6371,
      distance: 1 * auDistance.value,
      texture: '/skin/earth-skin.jpg',
      period: 1,
      rotation: 1,
      moonArr: [
        {
          name: 'moon',
          radius: 1737,
          distance: 0.09 * auDistance.value,
          texture: '/skin/moon-skin.jpg',
          period: 0.074,
        }
      ]
    },
    {
      name: 'mars',
      radius: 3389.5,
      distance: 1.52 * auDistance.value,
      texture: '/skin/mars-skin.jpg',
      period: 1.88,
      rotation: 1.03
    },
    {
      name: 'jupiter',
      radius: 69911,
      distance: 5.20 * auDistance.value,
      texture: '/skin/jupiter-skin.jpg',
      period: 11.86,
      rotation: 0.41
    },
    {
      name: 'saturn',
      radius: 58232,
      distance: 9.58 * auDistance.value,
      texture: '/skin/saturn-skin.jpg',
      period: 29.46,
      rotation: 0.42
    },
    {
      name: 'uranus',
      radius: 25362,
      distance: 19.18 * auDistance.value,
      texture: '/skin/uranus-skin.jpg',
      period: 84.01,
      rotation: 0.73
    },
    {
      name: 'neptune',
      radius: 24622,
      distance: 30.06 * auDistance.value,
      texture: '/skin/neptune-skin.jpg',
      period: 164.79,
      rotation: 0.7
    }
  ]

})



const sunRef = reactive({
  radius: 695700,//太阳太大，缩小
  scale: 0.05,
  au: 0,
  texture: '/skin/sun-skin.jpg',
  rotation: 25.4,
})
const earthRef = reactive({
  radius: 6371,
  widthSegments: 20,
  heightSegments: 20,
  au: 1,
  texture: '/skin/earth-skin.jpg',
})


// 加载黑暗森林
const initScene = () => {
  scene = new THREE.Scene();
};

// 加载韦伯望远镜
const initCamera = () => {
  da.camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    999999999
  );
  da.camera.position.set(0, 695700, 2000)
  da.camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
};

// 加载控制器
const initController = () => {
  da.controls = new OrbitControls(
    da.camera,
    da.renderer.domElement
  );
  da.controls.enableDamping = true;
  da.controls.dampingFactor = 0.2;
};



// 加载渲染器
const loadRenderer = () => {
  da.renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  const container = document.getElementById("container");
  const { width, height } = container.getBoundingClientRect()
  da.renderer.setSize(width, height);

  // da.renderer.setClearColor(0xb9d3ff, 1);
  container.appendChild(da.renderer.domElement);
  da.renderer.render(scene, da.camera);
};

const sphereGeometry = new THREE.SphereGeometry(
  earthRef.radius,
  earthRef.widthSegments,
  earthRef.heightSegments
);


const updateSunSize = () => {
  const ratio = sunRef.radius * sunRef.scale / earthRef.radius
  // sun.scale.set(ratio, ratio, ratio)
  gsap.to(scene.children[0].scale, {
    x: ratio, y: ratio, z: ratio,
    duration: 1,
    ease: "power2.out",
  })
}

const texLoader = new THREE.TextureLoader();
const initSun = async () => {

  // 定义顶点着色器和片段着色器
  const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

  const fragmentShader = `
    uniform sampler2D map;
    uniform float emissiveIntensity;
    varying vec2 vUv;
    
    void main() {
        vec4 texColor = texture2D(map, vUv);
        vec3 emissiveColor = vec3(1.0, 1.0, 1.0); // 你可以根据需要更改自发光颜色
        vec3 finalColor = mix(texColor.rgb, emissiveColor, emissiveIntensity);
        gl_FragColor = vec4(finalColor, texColor.a);
    }
`;

  // 创建自定义着色器材质
  const sunMaterial = new THREE.ShaderMaterial({
    uniforms: {
      map: { value: texLoader.load('/skin/sun-skin.jpg'), },
      emissiveIntensity: { value: 0.6 } // 控制自发光强度
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  });

  const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
  const ratio = sunRef.radius * sunRef.scale / earthRef.radius
  sun.scale.set(ratio, ratio, ratio)
  scene.add(sun);
  rotations.push(sun)
};

/**
 * 公转
 */
const planetOrbital = () => {
  // 更新行星位置
  // console.log(scene.children)
  planetArr.value.forEach((planetData, index) => {
    const planet = scene.children[index + 1]; // 跳过太阳
    const currentTimeMill = performance.now();
    const angle = currentTimeMill * 2 * Math.PI / (planetData.period * da.yearTime)// 将时间转换为角度
    const x = planetData.distance * Math.cos(angle);
    const y = 0;
    const z = planetData.distance * Math.sin(angle);


    gsap.to(planet.position, {
      x, y, z,
      duration: 0.3,
      ease: "power2.out",
    })

    if (planetData.moonArr?.length > 0) {
      planetData.moonArr.forEach((moonData, moonIndex) => {
        const moon = planet.children[moonIndex + 1];
        // const currentTimeMill = performance.now();
        const angle2 = currentTimeMill * 2 * Math.PI / (moonData.period * da.yearTime)// 将时间转换为角度
        const moonX = moonData.distance * Math.cos(angle2);
        const moonY = 0;
        const moonZ = moonData.distance * Math.sin(angle2);
        moon.position.set(moonX, moonY, moonZ)
      })
    }

    // planet.position.set(x, y, z)

  });
}
const initPlanets = async () => {
  generatePlanets(planetArr.value)

  // arr.forEach((planet, index) => {
  //   scene.add(planet)
  //   rotations.push(planet)
  // })
}
const generatePlanets = async (arr, planetGroup) => {

  arr.forEach((planetRef, idx) => {
    const planetMaterial = new THREE.MeshStandardMaterial({ map: texLoader.load(planetRef.texture) });
    const planet = new THREE.Mesh(sphereGeometry, planetMaterial);
    planet.castShadow = true;
    const ratio = planetRef.radius / earthRef.radius
    planet.scale.set(ratio, ratio, ratio)



    if (planetGroup) {
      planet.position.x = planetRef.distance
      planetGroup.add(planet)
    } else if (planetRef.moonArr?.length > 0) {
      const planetGroup = new THREE.Group();
      planetGroup.add(planet)
      scene.add(planetGroup);
      planetGroup.position.x = planetRef.distance
      generatePlanets(planetRef.moonArr, planetGroup)
      rotations.push(planet)
    } else {
      planet.position.x = planetRef.distance
      scene.add(planet);
      rotations.push(planet)
    }


  })


};




const handleChange = () => { }

// 执行动画
const animation = () => {

  da.controls && da.controls.update();
  planetOrbital()
  rotations.forEach((obj) => {
    obj.rotation.y += 0.005
  });
  da.renderer.render(scene, da.camera);
  requestAnimationFrame(animation);

};
// 光源设置
const loadPointLight = () => {

  //环境光
  const ambient = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambient);


  const pointLight = new THREE.PointLight(0xffffff, 10);
  pointLight.position.set(0, 0, 0);
  pointLight.castShadow = true;
  pointLight.decay = 0.1
  scene.add(pointLight);
};
const resizeScreen = () => {
  window.addEventListener("resize", () => {
    da.renderer.setSize(window.innerWidth, window.innerHeight);
    da.camera.aspect = window.innerWidth / window.innerHeight;
    da.camera.updateProjectionMatrix();
  });
}
const eventObj = {
  fullScreen: () => {
    document.requestFullScreen()
  },
  exitFullScreen: () => {
    document.exitFullScreen()
  }

}
const initGui = () => {
  const gui = new dat.GUI();
  gui.add(eventObj, 'fullScreen')
  gui.add(eventObj, 'exitFullScreen').name('退出全屏')
  // gui.add(scene.children[0], 'scale', 0.01, 1).name('太阳尺寸缩小')
}
const init = () => {
  initScene();
  initCamera();
  loadRenderer();
  initController();
  initSun()

  generatePlanets(planetArr.value)

  loadPointLight();
  animation();
  resizeScreen();
  //initGui()
};
onMounted(() => {
  init();
});

const handleMouseWheel = (event) => {
  console.log(event)
  event.preventDefault(); // 阻止
  const delta = Math.sign(event.deltaY) * 0.1;
  // 将鼠标屏幕坐标转换为归一化设备坐标
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );
  // 使用raycaster从鼠标位置射线到场景，找到交点作为新的缩放中心
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, da.camera);
  // 记录最近的交点
  const intersects = raycaster.intersectObjects(scene.children, true);
  let newZoomCenter = null;
  if (intersects.length > 0) {
    // 使用第一个交点作为新的缩放中心
    newZoomCenter = intersects[0].point;
  } else {
    // 如果没有交点，可以使用相机的看向方向作为默认
    newZoomCenter = da.camera.position.clone().add(da.camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(10));
  }
  // 调整OrbitControls的target，并缩放
  da.controls.target.copy(newZoomCenter);
  da.controls.update();

  // 手动调整相机的zoom属性，注意这需要根据实际情况调整缩放逻辑
  // 这里仅给出概念性的代码，实际实现可能需要更复杂的计算来保持正确的缩放效果
  da.controls.zoom += delta;
  da.controls.update();
}
const switchCenter = () => {
  da.camera.position.set(
    earthPosition.x + offsetDistance * Math.cos(cameraAngle),
    earthPosition.y + offsetDistance * Math.sin(cameraAngle),
    earthPosition.z // 如果是2D模拟，可以忽略z轴或设为0
  );


}

</script>

<style lang="less">
.params-control {
  position: absolute;
  top: 70px;
}

.el-overlay {
  background-color: transparent;
}
</style>