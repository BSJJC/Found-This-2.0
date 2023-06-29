<template>
  <div
    class="px-8 py-3 bg-[#7E56DA] rounded-xl text-white text-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#5833b0] hover:scale-105"
    @click="submit">
    SUBMIT
  </div>
</template>
  
<script setup lang='ts'>
import { useNewTopicInfo } from "@/stores/useNewTopicInfo"
import { storeToRefs } from "pinia";


const { title, text } = storeToRefs(useNewTopicInfo())

async function submit(): Promise<void> {
  console.log(title.value);
  console.log(text.value);

}


</script>
  
<style lang="scss" scoped>
* {
  user-select: none;
  -webkit-user-select: none;
}
</style>