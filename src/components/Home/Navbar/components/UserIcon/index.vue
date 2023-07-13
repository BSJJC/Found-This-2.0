<template>
  <div v-if="!showTransform && !userAvaterUrl" ref="logInBtnRef"
    class="flex justify-center items-center w-[50px] h-[50px] text-[20px] bg-[#7E56DA] text-white rounded-3xl cursor-pointer transition-all duration-500 ease-in-out"
    @click="showLogAndSign">
    Log In
  </div>

  <Transition name="user-avater">
    <div v-if="userAvaterUrl"
      class="w-[50px] h-[50px] text-[20px] bg-[#7E56DA] text-white rounded-3xl cursor-pointer transition-all duration-500 ease-in-out">
      <img :src="`http://localhost:5000/api/userAvaters/get/${userAvaterUrl}`" alt="user avater">
    </div>
  </Transition>

  <template v-if="showTransform">
    <Transform @hide="hidedTransform" :randomIDs="randomIDs" :states="states" :detailChanges="detailChanges">
      <template #original>
        <div :id="randomIDs[0]"
          class="flex justify-center items-center w-[50px] h-[50px] text-[20px] bg-[#7E56DA] text-white rounded-3xl cursor-pointer transition-all duration-500 overflow-hidden z-[200]">
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
import { storeToRefs } from 'pinia';
import userLogAndSign from '@/stores/useLogAndSign';
import { RequestingSentences, RequestStates } from "@/types/LogAndSign"

import Transform from '@/components/Common/Transform.vue';
const LogAndSign = defineAsyncComponent(() => import("../LogAndSign/index.vue"))

const { RequestState, RequestingSentence } = storeToRefs(userLogAndSign())

const userAvaterUrl: Ref<string | null> = ref(null)

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

/**
 * 展示登录、注册页面
 */
function showLogAndSign(): void {
  const rect: DOMRect = logInBtnRef.value!.getBoundingClientRect();
  const { width, height, top, left } = rect as {
    width: number, height: number, top: number, left: number
  }

  states.value.startWidth = width
  states.value.startHeight = height
  states.value.startTop = top
  states.value.startLeft = left

  states.value.endWidth = 80
  states.value.endHeight = 80

  showTransform.value = true
}

/**
 * 隐藏Transform
 */
function hidedTransform(): void {
  RequestState.value = RequestStates.Pending;
  RequestingSentence.value = RequestingSentences["Please wait...."]

  const data = JSON.parse(sessionStorage.getItem("userInfo")!)
  if (data) {
    userAvaterUrl.value = data.userAvaterID;
  }
  showTransform.value = false
};
</script>

<style lang="scss" scoped>
* {
  user-select: none;
  -webkit-user-select: none;
}

.user-avater-leave-active,
.user-avater-enter-active {
  transition: all .3s ease-in-out;
}

.user-avater-enter-from,
.user-avater-leave-to {
  opacity: 0;
}
</style>