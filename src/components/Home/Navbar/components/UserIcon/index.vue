<template>
  <div v-if="!showTransform" ref="logInBtnRef"
    class="flex justify-center items-center w-[50px] h-[50px] text-[20px] bg-red-300 text-white rounded-full hover:cursor-pointer"
    @click="showLogAndSign">
    Log In
  </div>

  <template v-if="showTransform">
    <TransformZoomIn @hide="hidedTransformZoomIn"></TransformZoomIn>
  </template>
</template>
  
<script setup lang='ts'>
import { ref, Ref } from "vue"
import TransformZoomIn from '@/components/Common/TransformZoomIn.vue';

const showTransform: Ref<boolean> = ref(false)
const logInBtnRef = ref()

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
  