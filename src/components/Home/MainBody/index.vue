<template>
  <el-scrollbar height="100%">
    <div class="w-full h-full flex justify-start items-center px-5 pt-10 flex-wrap flex-row">
      <Topics></Topics>
    </div>

    <Pagination :page-size="5" :page-counts="10"></Pagination>
  </el-scrollbar>
</template>
  
<script setup lang='ts'>
import { defineAsyncComponent } from "vue"

const Topics = defineAsyncComponent(() => import("./components/Topics.vue"))
const Pagination = defineAsyncComponent(() => import("./components/Pagination.vue"))
</script>