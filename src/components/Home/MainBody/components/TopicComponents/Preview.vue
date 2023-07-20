<template>
  <div id="container" class="bg-blue-300 rounded-lg overflow-hidden flex justify-center items-center">
    <div id="content" class="bg-red-300 overflow-hidden">
    </div>
  </div>
</template>
  
<script setup lang='ts'>

</script>

<style lang="scss" scoped>
#container {
  animation: container-in .25s ease-in-out forwards;
  overflow: hidden !important;
}

@keyframes container-in {
  10% {
    width: 0px;
    height: 0px;
  }

  20% {
    width: 200px;
    height: 0px;
  }

  100% {
    width: 200px;
    height: 350px;
  }
}
</style>