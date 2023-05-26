<template>
  <div class=" flex justify-center items-center w-[80vw] h-[80vh] z-10 absolute rounded-2xl overflow-hidden">
    <!-- forms -->
    <div
      class="w-1/2 h-full flex justify-center items-center relative bg-white overflow-hidden transition-all duration-1000 ease-in-out z-50"
      :style="{ transform: `${state === States.LogIn ? 'translateX(0%)' : 'translateX(100%)'}` }">
      <Transition name="fade-up">
        <KeepAlive>
          <component :is="state == States.LogIn ? LogIn : SignUp" @switchState="switchState" class="absolute"></component>
        </KeepAlive>
      </Transition>
    </div>

    <!-- lottie animation -->
    <div
      class="w-1/2 h-full flex justify-center items-center bg-[#ffffff80] relative transition-all duration-1000 ease-in-out z-10"
      :style="{ transform: `${state === States.LogIn ? 'translateX(0%)' : 'translateX(-100%)'}` }">
      <TransitionGroup name="fade-up">
        <lottie-animation v-if="state === States.LogIn" :off-line="animationData"
          class="w-[90%] absolute"></lottie-animation>
        <lottie-animation v-if="state === States.SignUp" :off-line="animationData"
          class="w-[90%] absolute"></lottie-animation>
      </TransitionGroup>
    </div>

    <!-- middel animation -->
    <middel-animation class="w-full h-full z-[100] absolute transition-all duration-500 translate-y-[100%]"
      :style="{ transform: `${middleAnimationState === MiddleAnimationStates.Pending ? 'translateY(100%)' : 'translateY(0%)'}` }"></middel-animation>
  </div>
</template>


<script lang="ts" setup>
import { ref, Ref, onBeforeMount, defineAsyncComponent } from "vue"
import LottieAnimation from '@/components/Common/LottieAnimation.vue';
import { userLogAndSign } from "@/stores/useLogAndSign"
import { storeToRefs } from "pinia"
import { States, MiddleAnimationStates } from "@/types/LogAndSign.ts"

import LogIn from "./components/LogIn.vue";
const SignUp = defineAsyncComponent(() => import("./components/SignUp.vue"))
const MiddelAnimation = defineAsyncComponent(() => import("./components/MiddelAnimation.vue"))

const animationData: Ref<object | undefined> = ref<object>();
const { state } = storeToRefs(userLogAndSign())
const { middleAnimationState } = storeToRefs(userLogAndSign())

/**
 * 加载本地登录页面lottie动画
 */
async function fetchLogInAnimationData(): Promise<void> {
  state.value = States.LogIn
  animationData.value = (await import("@/assets/lottie/LogInLottie.json")).default
}
/**
 * 加载本地注册页面Lottie动画
 */
async function fetchSignUpAnimationData(): Promise<void> {
  state.value = States.SignUp
  animationData.value = (await import("@/assets/lottie/SignUpLottie.json")).default
}

/**
 * 将state在LogIn和SignUp之间切换
 * 从而改变页面
 */
function switchState(): void {
  state.value === States.LogIn
    ? fetchSignUpAnimationData()
    : fetchLogInAnimationData();
}

onBeforeMount(() => {
  fetchLogInAnimationData()
})
</script>


<style lang="scss" scoped>
@use "@/css/transformAnimations.scss"
</style>