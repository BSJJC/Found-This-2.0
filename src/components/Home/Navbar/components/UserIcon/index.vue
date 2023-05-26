<template>
  <div v-if="!showTransform" ref="logInBtnRef"
    class="flex justify-center items-center w-[50px] h-[50px] text-[20px] bg-[#7E56DA] text-white rounded-3xl cursor-pointer transition-all duration-500 ease-in-out"
    @click="showLogAndSign">
    Log In
  </div>

  <template v-if="showTransform">
    <Transform @hide="hidedTransform" :randomIDs="randomIDs" :states="states" :detailChanges="detailChanges">
      <template #origin>
        <div :id="randomIDs[0]"
          class="flex justify-center items-center w-[50px] h-[50px] text-[20px] bg-[#7E56DA] text-white rounded-3xl cursor-pointer transition-all duration-500 overflow-hidden z-[100]">
          Log In
        </div>
      </template>

      <template #target>
        <log-and-sign :id="randomIDs[1]"></log-and-sign>
      </template>
    </Transform>
  </template>
</template>
  
<script setup lang='ts'>
import { ref, Ref, defineAsyncComponent } from "vue"
import Transform from '@/components/Common/Transform.vue';

const LogAndSign = defineAsyncComponent(() => import("../LogAndSign/index.vue"))

const showTransform: Ref<boolean> = ref(false)
const logInBtnRef: Ref<HTMLElement | undefined> = ref()
const randomIDs: string[] = [Math.random().toString(), Math.random().toString()]
const states = ref({
  startWidth: 0,
  startHeight: 0,
  startTop: 0,
  startLeft: 0,
  endWidth: 0,
  endHeight: 0
})
const detailChanges = [
  {
    prop: "borderRadius",
    targetVal: "1rem"
  },
  {
    prop: "fontSize",
    targetVal: "100px"
  }
]

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
function hidedTransform(): void {
  showTransform.value = false
};
</script>

<style lang="scss" scoped>
* {
  user-select: none;
  -webkit-user-select: none;
}
</style>