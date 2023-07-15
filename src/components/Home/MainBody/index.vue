<template>
  <el-scrollbar height="100%">
    <div class="w-full h-full flex justify-start items-center flex-col px-[10%]">
      <Control></Control>

      <Topic></Topic>
    </div>

    <Pagination :page-size="10" :page-counts="100"></Pagination>
  </el-scrollbar>
</template>
  
<script setup lang='ts'>
import Control from "./components/Control.vue"
import Topic from "./components/Topic.vue"
import Pagination from "./components/Pagination.vue"
</script>