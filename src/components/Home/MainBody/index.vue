<template>
  <div class="w-full flex flex-col justify-start items-center">
    <el-scrollbar class="w-full">

      <asd></asd>

      <bsd></bsd>

    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import asd from "./components/partOne.vue"
import bsd from "./components/b.vue"
</script>

<style lang="scss" scoped>
:deep(.el-scrollbar__bar) {
  opacity: 0;
}
</style>