<template>
    <div class="three-canvas" ref="threeTarget"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TEngine } from '@/utils/TEngine'
import { basicObjectList } from '@/utils/TBasicObjects'
const threeTarget = ref(null)


const init = () => {
    const TE = new TEngine(threeTarget.value!)
    TE.addObject(...basicObjectList)
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