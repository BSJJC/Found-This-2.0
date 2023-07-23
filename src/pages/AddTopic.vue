<template>
  <!--mask  -->
  <div id="mask"
    class="w-screen h-screen fixed flex justify-center items-center bg-[#7E56DA] z-[999] text-white text-[5rem]">
    ADD NEW TOPIC
  </div>

  <!-- main -->
  <NavBar></NavBar>

  <EditArea></EditArea>
</template>
  
<script setup lang='ts'>
import NavBar from "@/components/AddTopic/NavBar/index.vue"
import EditArea from "@/components/AddTopic/EditArea/index.vue"
</script>
  
<style lang="scss" scoped>
#mask {
  animation: mask 0.3s ease-in-out forwards;
}

@keyframes mask {
  99% {
    opacity: 0;
    display: block;
  }

  100% {
    opacity: 0;
    display: none;
    z-index: -1;
  }
}
</style>