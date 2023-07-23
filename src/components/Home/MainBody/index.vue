<template>
  <el-scrollbar height="100%">
    <div class="w-full h-full flex justify-start items-center flex-col px-[10%]">
      <span v-for="(i, index) in 30" :key="index"
        class="fade-in-component component-out text-[4rem] transition-all duration-300 ease-linear">
        {{ i }}
      </span>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
</script>

