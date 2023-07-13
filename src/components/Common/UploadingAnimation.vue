<template>
  <div class="w-full h-1/2 transition-all duration-300 ease">
    <div class="w-full h-1/2 flex justify-center items-center bg-white">
      <Transition name="lottie" mode="out-in">
        <!-- lottie animations -->
        <LottieAnimation v-if="props.state === 'Success'" :off-line="Success" class=" scale-50">
        </LottieAnimation>
        <LottieAnimation v-else-if="props.state === 'Failed'" :off-line="Failed"></LottieAnimation>
        <LottieAnimation v-else :off-line="loading"></LottieAnimation>
      </Transition>
    </div>

    <div class="w-full h-1/2 flex justify-center items-center bg-[#7e56da] text-[3rem] font-bold text-white relative">
      <!-- sentence -->
      <div v-for="(i, index) in sentence" :key="index" :id="props.state"
        class="text-[3rem] text-white mr-[10px] uppercase" :style="{ animationDelay: `${index * 0.1}s` }">
        {{ i }}
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import LottieAnimation from "@/components/Common/LottieAnimation.vue";
import loading from "@/assets/lottie/LoadingLottie.json"
import Success from "@/assets/lottie/SuccessLottie.json"
import Failed from "@/assets/lottie/FailedLottie.json"

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

#Pending {
  animation: Pending 1s ease-in-out infinite;
}

#Fulfilled {
  animation: Pending 1s ease-in-out infinite;
}

@keyframes Pending {
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

#Success {
  animation: Success 0.3s ease-in-out forwards;
}

@keyframes Success {
  to {
    transform: translateY(-20px);
  }
}

#Failed {
  animation: Failed 1.5s ease-in-out forwards;
  animation-delay: 0s !important;
}

@keyframes Failed {
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