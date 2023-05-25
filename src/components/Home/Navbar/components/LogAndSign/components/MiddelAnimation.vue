<template>
  <div class="flex justify-center items-center flex-col">
    <div class="w-full h-1/2 bg-white flex justify-center items-center">
      <lottie-animation v-if="state === 0" :off-line="loading"></lottie-animation>
    </div>

    <div class="w-full h-1/2 bg-[#7e56da] flex justify-center items-center ">
      <div v-for="(i, index) in Sentences[sentence]" :key="index" :id="sentenceID"
        class="text-[5rem] text-white mr-[10px] uppercase" :style="{ animationDelay: `${index * 0.1}s` }">
        {{ i }}
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { ref, Ref } from "vue"
import LottieAnimation from '@/components/Common/LottieAnimation.vue';
import loading from "@/assets/lottie/LoadingLottie.json"

enum States {
  "loading",
  "success",
  "failed"
}

enum Sentences {
  "please   wait...",
  "login   success!",
  "login   failed..."
}

const state: Ref<States> = ref<States>(States.loading)
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