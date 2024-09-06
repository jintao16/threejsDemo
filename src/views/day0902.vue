<template>
    <div class="three-canvas" ref="threeTarget"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TEngine } from '@/utils/TEngine'
import { basicObjectList } from '@/utils/TBasicObjects'
// import { TCanvasTextureEditors } from '@/utils/TCanvasTextureEditors';
import { lightsList } from '@/utils/TLights';
import { helperList } from '@/utils/THelper';
import { codeModelList } from '@/utils/TCodeModels';

const threeTarget = ref(null)
const init = () => {
    const TE = new TEngine(threeTarget.value!)
    TE.addObject(...basicObjectList)
    TE.addObject(...lightsList)
    TE.addObject(...helperList)
    TE.addObject(...codeModelList)


    // const testCanvas = new TCanvasTextureEditors()
    // testCanvas.draw((ctx) => {
    //     ctx.rect(10, 10, 40, 50) // 坐标
    //     ctx.fillStyle = 'blue'
    //     ctx.fill()

    //     ctx.beginPath() // 画一个矩形
    //     ctx.rect(100, 100, 50, 50) // 坐标
    //     ctx.strokeStyle = 'red' // 边框颜色
    //     ctx.stroke() // 边框
    //     ctx.closePath() // 关闭路径
    // })
    // testCanvas.preview() // 预览
}
onMounted(() => {
    init()
})

</script>

<style lang="less">
.three-canvas {
    width: 100%;
    height: 100%;
}
</style>