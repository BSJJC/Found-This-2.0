<template>
  <div class="w-full h-full flex justify-center items-start">

    <!-- Appendixes -->
    <div class="absolute w-full h-full flex justify-start items-center">
      <Drawer></Drawer>
    </div>

    <!-- Editor -->
    <div class="w-[90%] h-[90%] p-8">
      <Editor class="h-full"></Editor>
    </div>

  </div>
</template>
  
<script setup lang='ts'>
import Editor from "./components/Editor.vue"
import Drawer from "./components/Drawer.vue";
</script>