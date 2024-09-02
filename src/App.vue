<template>
  <div class="common-layout w-100 h-100">
    <el-container class="w-100 h-100">
      <el-header class="o-h">
        <el-menu :default-active="activeIndex" class="el-menu-demo w-100" mode="horizontal" router>
          <el-menu-item v-for="item in routesArr" :key="item.name" :index="item.path">{{ item.name }}</el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="main"> <router-view /></el-main>
    </el-container>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import router from '@/router/index.js'

const routesArr = router.getRoutes()
console.log(routesArr)
const activeIndex = ref('1')
</script>


<style lang="less">
.el-main {
  padding: var(--el-main-padding);
}

#app {
  height: 100%;
  width: 100%;
}

html,
body {
  height: 100%;
  width: 100%;
}

.logo {
  height: 6em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.main {
  width: 100%;
  height: calc(100% - 60px);
}
</style>
