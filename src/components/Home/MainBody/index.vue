<template>
  <div class="w-full flex flex-col justify-start items-center">
    <el-scrollbar class="w-full">

      <one></one>

      <div class="w-full h-[100vh] bg-pink-300"></div>

    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import one from "./components/partOne.vue"
</script>

<style lang="scss" scoped>
:deep(.el-scrollbar__bar) {
  opacity: 0;
}
</style>