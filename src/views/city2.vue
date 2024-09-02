<template>
    <div :id="boxId" class="container"></div>

</template>

<script setup>
import * as THREE from 'three'
import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'
import ZThree from '@/utils/zthree.js'
import { onMounted } from 'vue';

let app, camera, scene, renderer, controls, clock, cityModel;
const boxId = 'container'
onMounted(() => {
    initZThree()
})
const initZThree = async () => {
    app = new ZThree(boxId);
    app.initThree();
    app.initHelper();
    app.initOrbitControls();
    app.initLight();
    initMapTalks()
    window.app = app;
    camera = app.camera;
    scene = app.scene;
    renderer = app.renderer;
    controls = app.controls;
    clock = new THREE.Clock();
    camera.position.set(30, 30, 30);
}

const initMapTalks = (option) => {
    let config = {
        center: [113.31915199756622, 31.109087176037534],
        zoom: 10,
        pitch: 70,
        bearing: 180,

        centerCross: true,
        doubleClickZoom: false,
        baseLayer: new maptalks.TileLayer('tile', {
            urlTemplate: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            subdomains: ['a', 'b', 'c', 'd']
        })
    };
    option = Object.assign(config, option);
    let map = new maptalks.Map(boxId, option);

    // let threeLayer = new ThreeLayer('t', {
    //     forceRenderOnMoving: true,
    //     forceRenderOnRotating: true
    // });

    // threeLayer.addTo(map);

    // ThreeLayer.prototype.coordinateToXYZ = function (coordinate, height = 0) {
    //     let z = this.distanceToVector3(height, height).x;
    //     let v = this.coordinateToVector3(coordinate, z)
    //     return [v.x, v.y, v.z];
    // }

    // return threeLayer;
}





</script>

<style lang='less' scoped>
.container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #000;
}
</style>