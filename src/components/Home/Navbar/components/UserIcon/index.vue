<template>
  <div v-if="!showTransform" ref="logInBtnRef" class="log-in-btn" @click="showLogAndSign">
    Log In
  </div>

  <template v-if="showTransform">
    <TransformZoomIn @hide="hidedTransformZoomIn" :randomID="randomID">
      <div :id="randomID" class="log-in-btn">
        Log In
      </div>
    </TransformZoomIn>
  </template>
</template>
  
<script setup lang='ts'>
import { ref, Ref } from "vue"
import TransformZoomIn from '@/components/Common/TransformZoomIn.vue';

const showTransform: Ref<boolean> = ref(false)
const logInBtnRef = ref()
const randomID = Math.random().toString();

function showLogAndSign(): void {
  showTransform.value = true
}

/**
 * @description        hide transform zoom in
 */
function hidedTransformZoomIn(): void {
  showTransform.value = false
};
</script>
  
<style lang="scss" scoped>
.log-in-btn {
  @apply flex justify-center items-center w-[50px] h-[50px] text-[20px] bg-red-300 text-white rounded-full cursor-pointer transition-all duration-200 ease-in-out
}
</style>