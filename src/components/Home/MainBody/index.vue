<template>
  <el-scrollbar height="100%">
    <div class="w-full h-full flex justify-start items-center px-5 py-10 flex-wrap flex-row">
      <Topics v-for="(i, index) in 3" :key="index"></Topics>
    </div>

    <Pagination></Pagination>
  </el-scrollbar>
</template>
  
<script setup lang='ts'>
import { defineAsyncComponent } from "vue"

const Topics = defineAsyncComponent(() => import("./components/Topics.vue"))
const Pagination = defineAsyncComponent(() => import("./components/Pagination.vue"))
</script>