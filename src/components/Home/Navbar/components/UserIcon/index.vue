<template>
  <div v-if="!showTransform" ref="logInBtnRef"
    class="flex justify-center items-center w-[50px] h-[50px] text-[20px] bg-red-300 text-white rounded-full cursor-pointer transition-all duration-500 ease-in-out"
    @click="showLogAndSign">
    Log In
  </div>

  <template v-if="showTransform">
    <TransformZoomIn @hide="hidedTransformZoomIn" :randomID="randomID" :states="states">
      <div :id="randomID"
        class="flex justify-center items-center w-[50px] h-[50px] text-[20px] bg-red-300 text-white rounded-full cursor-pointer transition-all duration-500 ">
        Log In
      </div>
    </TransformZoomIn>
  </template>
</template>
  
<script setup lang='ts'>
import { ref, Ref } from "vue"
import TransformZoomIn from '@/components/Common/TransformZoomIn.vue';

const showTransform: Ref<boolean> = ref(false)
const logInBtnRef: Ref<HTMLElement | undefined> = ref()
const randomID: string = Math.random().toString();
const states = ref({
  startWidth: 0,
  startHeight: 0,
  startTop: 0,
  startLeft: 0,
  endWidth: 0,
  endHeight: 0
})

function showLogAndSign(): void {
  const rect: DOMRect = logInBtnRef.value!.getBoundingClientRect();
  const { width, height, top, left } = rect;

  states.value.startWidth = width
  states.value.startHeight = height
  states.value.startTop = top
  states.value.startLeft = left

  states.value.endWidth = 80
  states.value.endHeight = 80

  showTransform.value = true
}

/**
 * @description        hide transform zoom in
 */
function hidedTransformZoomIn(): void {
  showTransform.value = false
};
</script>