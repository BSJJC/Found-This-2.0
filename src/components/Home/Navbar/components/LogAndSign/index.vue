<script lang="ts" setup>
import { ref, onBeforeMount, defineAsyncComponent } from "vue"
import LottieAnimation from '@/components/Common/LottieAnimation.vue';

import LogIn from "./components/LogIn.vue";
const SignUp = defineAsyncComponent(() => import("./components/SignUp.vue"))

const animationData = ref<object>();

/**
 * 加载本地登录页面lottie动画
 */
async function fetchLogInAnimationData(): Promise<void> {
  animationData.value = (await import("@/assets/lottie/LogInLottie.json")).default
}
/**
 * 加载本地注册页面Lottie动画
 */
async function fetchSignUpAnimationData(): Promise<void> {
  animationData.value = (await import("@/assets/lottie/SignUpLottie.json")).default
}

onBeforeMount(() => {
  fetchLogInAnimationData()
})
</script>

<template>
  <div class=" flex justify-center items-center w-[80vw] h-[80vh] z-10 absolute rounded-2xl overflow-hidden">

    <!-- forms -->
    <div class="w-1/2 h-full">
      <!-- Log in form -->
      <log-in @to-sign-up-page="fetchSignUpAnimationData"></log-in>
      <!-- sign up form -->
    </div>

    <!-- lottie animation -->
    <div class="w-1/2 h-full flex justify-center items-center bg-[#ffffff80]">
      <Transition name="fade" mode="out-in">
        <lottie-animation v-if="animationData" :off-line="animationData" class="w-[90%]"></lottie-animation>
        <lottie-animation v-else :off-line="animationData" class="w-[90%]"></lottie-animation>
      </Transition>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>