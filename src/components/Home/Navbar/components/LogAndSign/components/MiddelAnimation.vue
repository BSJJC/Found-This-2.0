<template>
  <div
    class="w-full h-full z-[100] absolute transition-all duration-500 translate-y-[100%] flex justify-center items-center flex-col">
    <!-- lottie animations -->
    <div class="w-full h-1/2 bg-white flex justify-center items-center">
      <transition-group name="fade-up">
        <lottie-animation v-if="middleAnimationState === MiddleAnimationStates.Fulfilled" :off-line="loading"
          class="absolute"></lottie-animation>

        <lottie-animation v-if="middleAnimationState === MiddleAnimationStates.Success" :off-line="success"
          class="absolute scale-50"></lottie-animation>

        <lottie-animation v-if="middleAnimationState === MiddleAnimationStates.Failed" :off-line="failed"
          class="absolute"></lottie-animation>
      </transition-group>
    </div>

    <!-- sentences -->
    <div class="w-full h-1/2 bg-[#7e56da] flex justify-center items-center ">
      <transition name="fade-up">
        <div class="flex justify-center items-center flex-row absolute" :key="sentence">
          <div v-for="(i, index) in MiddleAnimationSentences[sentence]" :key="index" :id="sentenceID"
            class="text-[3rem] text-white mr-[10px] uppercase" :style="{ animationDelay: `${index * 0.1}s` }">
            {{ i }}
          </div>
        </div>
      </transition>
    </div>

    <!-- back button when failed -->
    <transition name="fade-up">
      <component :is="iconArrowDown" v-if="middleAnimationState === MiddleAnimationStates.Failed" id="back"
        class="absolute w-[50px] bottom-10 cursor-pointer" fill="white" @click="reset"></component>
    </transition>
  </div>
</template>
  
<script setup lang='ts'>
import { ref, Ref, watch, defineAsyncComponent } from "vue"
import { storeToRefs } from "pinia";
import LottieAnimation from '@/components/Common/LottieAnimation.vue';
import userLogAndSign from "@/stores/useLogAndSign";
import { MiddleAnimationStates, MiddleAnimationSentences } from "@/types/LogAndSign"

import loading from "@/assets/lottie/LoadingLottie.json"
import success from "@/assets/lottie/SuccessLottie.json"
import failed from "@/assets/lottie/FailedLottie.json"

const iconArrowDown = defineAsyncComponent(() => import("@/assets/icons/IconArrowDown.vue"))

const { middleAnimationState } = storeToRefs(userLogAndSign()) as { middleAnimationState: Ref<MiddleAnimationStates> }
const sentence: Ref<MiddleAnimationSentences> = ref<MiddleAnimationSentences>(MiddleAnimationSentences["please wait..."])
const sentenceID: Ref<"loading" | "success" | "failed"> = ref<"loading" | "success" | "failed">("loading")

function reset(): void {
  middleAnimationState.value = MiddleAnimationStates.Pending
  sentence.value = MiddleAnimationSentences["please wait..."]
}

watch(
  () => middleAnimationState.value,
  (newVal) => {
    if (newVal === MiddleAnimationStates.Success) {
      sentence.value = MiddleAnimationSentences["login success!"]
      sentenceID.value = "success"
    }

    if (newVal === MiddleAnimationStates.Failed) {
      sentence.value = MiddleAnimationSentences["login failed..."]
      sentenceID.value = "failed"
    }
  }
)
</script>

<style lang="scss" scoped>
@use"@/css/transformAnimations.scss";


#loading {
  animation: loading 1s ease-in-out infinite;
}

@keyframes loading {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0);
  }
}


#success {
  animation: success 0.3s ease-in-out forwards;
}

@keyframes success {
  to {
    transform: translateY(-20px);
  }
}


#failed {
  animation: failed 1.5s ease-in-out forwards;
  animation-delay: 0s !important;
}

@keyframes failed {
  0% {
    transform: translateY(0px);
  }

  60% {
    transform: translateY(-10px) scale(1.1);
  }

  70% {
    transform: translateY(-30px) scale(1.3);
  }

  90% {
    transform: translateY(10px) scale(0.9);
  }

  100% {
    transform: translateY(0px) scale(1);
  }
}

#back {
  animation: bounce 2s ease infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(20px);
  }
}
</style>