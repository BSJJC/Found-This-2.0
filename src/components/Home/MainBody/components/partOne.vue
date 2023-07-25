<template>
  <div class="w-full h-[100vh] flex justify-center items-center flex-col relative overflow-hidden bg-red-200">

    <!-- 背景遮挡 -->
    <div ref="backBlock" class=" absolute w-full h-full flex justify-between items-center ">
      <div class="h-full bg-white transition-all duration-75 ease-linear" :style="{ width: `${backBlockWidth}vw` }">
      </div>
      <div class="h-full bg-white transition-all duration-75 ease-linear" :style="{ width: `${backBlockWidth}vw` }">
      </div>
    </div>

    123

    <img src="../../../../assets/2023-02-27 083.jpg">

  </div>
</template>
  
<script setup lang='ts'>
import { ref, Ref } from "vue"
import changeWhenWheel from "@/utils/changeWhenWheel"

const backBlock: Ref<HTMLElement | undefined> = ref()
const backBlockWidth: Ref<number> = ref(40)

// 为backBlock添加事件，使其随着页面向下的滚动，backBlockWidth逐渐减少
window.addEventListener("wheel", () => { changeWhenWheel(backBlock.value as HTMLElement, backBlockWidth, 40) })
</script>
  
<style></style>