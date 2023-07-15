<template>
  <div class="flex justify-start items-center flex-col w-full min-h-[200px] py-[20px]">

    <div v-for="(i, index) in 20" :key="index"
      class="w-[95%] bg-[#7e56da] text-white text-[1.5rem] py-2 px-4 rounded-lg mb-3 transition-all duration-300 opacity-80 hover:opacity-100">
      {{ i }}</div>

  </div>
</template>
  
<script setup lang='ts'>

</script>