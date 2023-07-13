<template>
  <el-scrollbar height="100%">
    <div class="w-full h-full flex justify-start items-center flex-col px-[10%]">
      <Control></Control>

      <div class="flex justify-center items-center flex-col w-full h-[200px] bg-red-300">
        <span>
          TODO
        </span>
        <span>
          NEW topic style!
        </span>
      </div>

    </div>

    <Pagination :page-size="10" :page-counts="100"></Pagination>
  </el-scrollbar>
</template>
  
<script setup lang='ts'>
import Pagination from "./components/Pagination.vue"
import Control from "./components/Control.vue"
</script>