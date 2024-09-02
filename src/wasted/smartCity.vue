<template>
    <div class="smart-city d-f">

        <div class="sc-left flex-1"></div>
        <div class="sc-middle flex-1 d-f f-d-c">
            <div class="sm-top flex-1">
                <solar />
            </div>
            <div class="sm-center flex-1">
                <!-- <city /> -->
            </div>
            <div class="sm-bottom flex-1"></div>
        </div>
        <div class="sc-right flex-1"></div>

    </div>


</template>
<script setup>
import solar from './solar.vue'
import city from './city.vue'
</script>

<style lang="less">
.smart-city {
    width: 100%;
    height: 100vh;


}
</style>