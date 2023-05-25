<script lang="ts" setup>
import { ref, onBeforeMount, defineAsyncComponent } from "vue"
import LottieAnimation from '@/components/Common/LottieAnimation.vue';

import LogIn from "./components/LogIn.vue";
const SignUp = defineAsyncComponent(() => import("./components/SignUp.vue"))

const animationData = ref<object>();
const state = ref<"logIn" | "signUp">("logIn");

/**
 * 加载本地登录页面lottie动画
 */
async function fetchLogInAnimationData(): Promise<void> {
  state.value = "logIn"
  animationData.value = (await import("@/assets/lottie/LogInLottie.json")).default
}
/**
 * 加载本地注册页面Lottie动画
 */
async function fetchSignUpAnimationData(): Promise<void> {
  state.value = "signUp"
  animationData.value = (await import("@/assets/lottie/SignUpLottie.json")).default
}

onBeforeMount(() => {
  fetchLogInAnimationData()
})
</script>

<template>
  <div class=" flex justify-center items-center w-[80vw] h-[80vh] z-10 absolute rounded-2xl overflow-hidden">

    <!-- forms -->
    <div class="w-1/2 h-full flex justify-center items-center relative bg-white overflow-hidden">
      <TransitionGroup name="fade">
        <log-in v-if="state === 'logIn'" @to-sign-up-page="fetchSignUpAnimationData" class="absolute"></log-in>
        <sign-up v-if="state === 'signUp'" @to-log-in-page="fetchLogInAnimationData" class="absolute"></sign-up>
      </TransitionGroup>
    </div>

    <!-- lottie animation -->
    <div class="w-1/2 h-full flex justify-center items-center bg-[#ffffff80] relative">
      <TransitionGroup name="fade">
        <lottie-animation v-if="state === 'logIn'" :off-line="animationData" class="w-[90%] absolute"></lottie-animation>
        <lottie-animation v-if="state === 'signUp'" :off-line="animationData" class="w-[90%] absolute"></lottie-animation>
      </TransitionGroup>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.fade-active {
  position: absolute;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>