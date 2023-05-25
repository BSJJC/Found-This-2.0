<script lang="ts" setup>
import { ref, onBeforeMount, defineAsyncComponent } from "vue"
import LottieAnimation from '@/components/Common/LottieAnimation.vue';

import LogIn from "./components/LogIn.vue";
const SignUp = defineAsyncComponent(() => import("./components/SignUp.vue"))
const MiddelAnimation = defineAsyncComponent(() => import("./components/MiddelAnimation.vue"))

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

/**
 * 将state在LogIn和SignUp之间切换
 * 从而改变页面
 */
function switchState(): void {
  state.value === 'signUp'
    ? fetchLogInAnimationData()
    : fetchSignUpAnimationData();
}

onBeforeMount(() => {
  fetchLogInAnimationData()
})
</script>

<template>
  <div class=" flex justify-center items-center w-[80vw] h-[80vh] z-10 absolute rounded-2xl overflow-hidden">
    <!-- forms -->
    <div
      class="w-1/2 h-full flex justify-center items-center relative bg-white overflow-hidden transition-all duration-1000 ease-in-out z-50"
      :style="{ transform: `${state === 'logIn' ? 'translateX(0%)' : 'translateX(100%)'}` }">
      <Transition name="fade">
        <KeepAlive>
          <component :is="state == 'logIn' ? LogIn : SignUp" @switchState="switchState" class="absolute"></component>
        </KeepAlive>
      </Transition>
    </div>

    <!-- lottie animation -->
    <div
      class="w-1/2 h-full flex justify-center items-center bg-[#ffffff80] relative transition-all duration-1000 ease-in-out z-10"
      :style="{ transform: `${state === 'logIn' ? 'translateX(0%)' : 'translateX(-100%)'}` }">
      <TransitionGroup name="fade">
        <lottie-animation v-if="state === 'logIn'" :off-line="animationData" class="w-[90%] absolute"></lottie-animation>
        <lottie-animation v-if="state === 'signUp'" :off-line="animationData" class="w-[90%] absolute"></lottie-animation>
      </TransitionGroup>
    </div>

    <!-- middel animation -->
    <middel-animation class="w-full h-full z-[100] absolute"></middel-animation>
  </div>
</template>

<style lang="scss" scoped>
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