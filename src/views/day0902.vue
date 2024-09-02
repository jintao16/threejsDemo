<template>
    <div class="three-canvas" ref="threeTarget"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TEngine } from '@/utils/TEngine'

const threeTarget = ref(null)


const init = () => {
    new TEngine(threeTarget.value!)
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