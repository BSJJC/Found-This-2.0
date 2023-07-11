<template>
  <div class="w-full h-1/2 flex justify-center items-center bg-white">
    <Transition name="lottie" mode="out-in">
      <!-- lottie animations -->
      <LottieAnimation v-if="props.state === 'pending'" :off-line="loading"></LottieAnimation>
      <LottieAnimation v-else-if="props.state === 'success'" :off-line="success" class=" scale-50">
      </LottieAnimation>
      <LottieAnimation v-else-if="props.state === 'failed'" :off-line="failed"></LottieAnimation>
    </Transition>
  </div>

  <div class="w-full h-1/2 flex justify-center items-center bg-[#7e56da] text-[3rem] font-bold text-white relative">
    <!-- sentence -->
    <div v-for="(i, index) in sentence" :key="index" :id="props.state" class="text-[3rem] text-white mr-[10px] uppercase"
      :style="{ animationDelay: `${index * 0.1}s` }">
      {{ i }}
    </div>

    <!-- back button when failed -->
    <Transition>
      <iconArrowDown v-if="props.state === 'failed'" class="animate-bounce absolute bottom-10 w-[50px] cursor-pointer"
        fill="white">
      </iconArrowDown>
    </Transition>
  </div>
</template>
  
<script setup lang='ts'>
import { defineAsyncComponent } from "vue"
import LottieAnimation from "@/components/Common/LottieAnimation.vue";
import loading from "@/assets/lottie/LoadingLottie.json"
import success from "@/assets/lottie/SuccessLottie.json"
import failed from "@/assets/lottie/FailedLottie.json"
const iconArrowDown = defineAsyncComponent(() => import("@/assets/icons/IconArrowDown.vue"))

interface Config {
  state: string,
  sentence: string
}

const props = defineProps<Config>()
</script>
  
<style lang="scss" scoped>
.lottie-enter-active,
.lottie-leave-active {
  transition: all .5s ease-in-out;
}

.lottie-enter-from {
  opacity: 0;
  transform: translateY(100px);
}

.lottie-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#pending {
  animation: pending 1s ease-in-out infinite;
}

@keyframes pending {
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
</style>