<template>
  <div class="flex justify-center items-center flex-col">
    <div class="w-full h-1/2 bg-white flex justify-center items-center">
      <lottie-animation v-if="middleAnimationState === MiddleAnimationStates.Fulfilled"
        :off-line="loading"></lottie-animation>

    </div>

    <div class="w-full h-1/2 bg-[#7e56da] flex justify-center items-center ">
      <div v-for="(i, index) in Sentences[sentence]" :key="index" :id="sentenceID"
        class="text-[3rem] text-white mr-[10px] uppercase" :style="{ animationDelay: `${index * 0.1}s` }">
        {{ i }}
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { ref, Ref } from "vue"
import { storeToRefs } from "pinia";
import userLogAndSign from "@/stores/useLogAndSign";
import { MiddleAnimationStates } from "@/types/LogAndSign"
import LottieAnimation from '@/components/Common/LottieAnimation.vue';

import loading from "@/assets/lottie/LoadingLottie.json"
import success from "@/assets/lottie/SuccessLottie.json"
import failed from "@/assets/lottie/FailedLottie.json"

enum Sentences {
  "please   wait...",
  "login   success!",
  "login   failed..."
}

const { middleAnimationState } = storeToRefs(userLogAndSign())
const sentence: Ref<Sentences> = ref<Sentences>(Sentences["please   wait..."])
const sentenceID: Ref<"loading" | "success" | "failed"> = ref<"loading" | "success" | "failed">("loading")
</script>
  

<style lang="scss" scoped>
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
</style>