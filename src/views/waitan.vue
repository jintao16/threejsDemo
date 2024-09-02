<template>
    <div :id="boxId" class="container">
        <header class="header">智慧上海驾驶舱</header>
        <section class="leftTop"></section>
        <section class="leftCenter"></section>
        <section class="leftFooter"></section>
        <section class="rightTop"></section>
        <section class="rightCenter"></section>
        <section class="rightFooter"></section>
    </div>


</template>

<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ref, onMounted } from 'vue'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const boxId = 'container'
let scene, camera, renderer, controls
const loadScene = () => {
    scene = new THREE.Scene();
};
const loadCamera = () => {
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 10, 10); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
};
const loadRenderer = () => {
    renderer = new THREE.WebGLRenderer({
        alpha: true,//渲染器透明
        antialias: true,//抗锯齿
        precision: 'highp',//着色器开启高精度
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x228b22, 0.1);
    let container = document.getElementById(boxId);
    renderer.setClearColor(0xb9d3ff, 1);
    container.appendChild(renderer.domElement);
    renderer.render(scene, camera);
};
const loadController = () => {
    controls = new OrbitControls(
        camera,
        renderer.domElement
    );
    controls.addEventListener("change", render);
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
};

const render = () => {
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
};
// 执行动画
const animation = () => {
    cylinderAnimate()
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
    const point = new THREE.PointLight(0xffffff);
    point.position.set(200, 200, 200); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    const ambient = new THREE.AmbientLight();
    scene.add(ambient);
};
const resizeScreen = () => {
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
}
const loadGeometry = () => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/models/scene.gltf', function (object) {
        console.log(object)
        scene.add(object.scene);
    });
    const textureCubeLoader = new THREE.CubeTextureLoader();
    const textureCube = textureCubeLoader.load([
        "/img/right.jpg",//右
        "/img/left.jpg",//左
        "/img/top.jpg",//上
        "/img/bottom.jpg",//下
        "/img/front.jpg",//前
        "/img/back.jpg",//后
    ])
    scene.background = textureCube;
    scene.environment = textureCube;


};

let canvas = null //文字
//创建three文字
const threeText = () => {
    //用canvas生成图片
    canvas = document.createElement('canvas');
    canvas.width = 2000
    canvas.height = 2000
    let ctx = canvas.getContext('2d')
    //制作矩形
    ctx.fillStyle = "rgba(6,7,80,0.8)";
    ctx.fillRect(0, 0, 50, 16);
    //设置文字
    ctx.fillStyle = "#fff";
    ctx.font = 'normal 10px "楷体"'
    ctx.fillText('东方之珠', 6, 10)
    //生成图片
    let url = canvas.toDataURL('image/png');
    //将图片放到纹理中
    let geoMetry1 = new THREE.PlaneGeometry(30, 30);
    let texture = new THREE.TextureLoader().load(url);
    let material1 = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        opacity: 1,
        transparent: true
    })
    let textMesh = new THREE.Mesh(geoMetry1, material1)
    textMesh.position.set(14.6, -14, 0)
    scene.add(textMesh)
}
//触发东方明珠点击事件
const threeTextClick = () => {
    window.addEventListener('click', (event) => {
        console.log(event.clientX)
        if (event.clientX > 855 && event.clientX < 1022) {
            alert("触发了点击事件")
        } else { return }
    })
}
let cylinderGeometry = null
const initAperture = () => {
    let geometry = new THREE.CylinderGeometry(1, 1, 0.5, 64);
    let texture = new THREE.TextureLoader().load('/img/cheng.png');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1)
    texture.needsUpdate = true;

    let material = [
        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,

            transparent: true
        }),
        new THREE.MeshBasicMaterial({
            opacity: 0,
            side: THREE.DoubleSide,
            transparent: true
        }),
        new THREE.MeshBasicMaterial({
            opacity: 0,
            side: THREE.DoubleSide,
            transparent: true
        })
    ]

    cylinderGeometry = new THREE.Mesh(geometry, material);
    cylinderGeometry.position.set(0, 0, 0)
    scene.add(cylinderGeometry);
}

let cylinderRadius = 0
let cylinderOpacity = 1

const cylinderAnimate = () => {
    cylinderRadius += 0.01
    cylinderOpacity -= 0.01
    if (cylinderRadius > 1.2) {
        cylinderRadius = 0
        cylinderOpacity = 1
    }
    if (cylinderGeometry) {
        cylinderGeometry.scale.set(1 + cylinderRadius, 1, 1 + cylinderRadius)
        cylinderGeometry.material[0].opacity = cylinderOpacity
    }
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
    threeText()
    initAperture()
    // threeTextClick()
};
onMounted(() => {
    init();
});

</script>
<style>
.container {
    margin-top: 80px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.header {
    width: 100vw;
    height: 80px;
    position: fixed;
    top: 0;
    text-align: center;
    font-size: 28px;
    letter-spacing: 4px;
    line-height: 65px;
    color: #fff;
    background-image: url("../public/img/23.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.leftTop {
    width: 400px;
    height: 310px;
    position: fixed;
    z-index: 9999999;
    top: 40px;
    left: 20px;
    border-radius: 10px;
    background-color: rgba(6, 7, 80, 0.6);
}

.leftCenter {
    width: 400px;
    height: 310px;
    position: fixed;
    z-index: 9999999;
    top: 370px;
    left: 20px;
    border-radius: 10px;
    background-color: rgba(6, 7, 80, 0.6);
}

.leftFooter {
    width: 400px;
    height: 210px;
    position: fixed;
    z-index: 9999999;
    top: 700px;
    left: 20px;
    border-radius: 10px;
    background-color: rgba(6, 7, 80, 0.6);
}

.rightTop {
    width: 400px;
    height: 310px;
    position: fixed;
    z-index: 9999999;
    top: 40px;
    right: 20px;
    border-radius: 10px;
    background-color: rgba(6, 7, 80, 0.6);
}

.rightCenter {
    width: 400px;
    height: 310px;
    position: fixed;
    z-index: 9999999;
    top: 370px;
    right: 20px;
    border-radius: 10px;
    background-color: rgba(6, 7, 80, 0.6);
}

.rightFooter {
    width: 400px;
    height: 210px;
    position: fixed;
    z-index: 9999999;
    top: 700px;
    right: 20px;
    border-radius: 10px;
    background-color: rgba(6, 7, 80, 0.6);
}
</style>