<template>
  <div v-if="!showTransform" ref="logInBtnRef" class="log-in-btn" @click="showLogAndSign">
    Log In
  </div>

  <template v-if="showTransform">
    <TransformZoomIn @hide="hidedTransformZoomIn" :randomID="randomID" :states="states">
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
const states = ref({
  startWidth: 0,
  startHeight: 0,
  startTop: 0,
  startLeft: 0,
  endWidth: 0,
  endHeight: 0
})

function showLogAndSign(): void {
  const rect = logInBtnRef.value.getBoundingClientRect();
  const { width, height, top, left } = rect;

  states.value.startWidth = width
  states.value.startHeight = height
  states.value.startTop = top
  states.value.startLeft = left

  showTransform.value = true
}

/**
 * @description        hide transform zoom in
 */
function hidedTransformZoomIn(): void {
  showTransform.value = false
};
</script>
  
<style lang="sass" scoped>
.log-in-btn 
  @apply flex justify-center items-center w-[50px] h-[50px] text-[20px] bg-red-300 text-white rounded-full cursor-pointer transition-all duration-500 ease-in-out
</style>