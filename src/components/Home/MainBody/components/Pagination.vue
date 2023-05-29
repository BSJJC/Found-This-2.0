<template>
  <div class="w-full h-full flex justify-center items-center">
    <div class="flex justify-center items-center">
      <!-- start page -->
      <div class="flex justify-center items-center">
        <button @mouseenter="leftArrorColor = 'white'" @mouseleave="leftArrorColor = '#7e56da'">
          <IconArrowLeft class="h-2/3 transition-all duration-300" :fill="leftArrorColor"></IconArrowLeft>
        </button>

        <div class="flex justify-center items-center mx-1">
          <button>1</button>
          <transition name="ellipsis">
            <div class="text-right w-[20px]">
              ···
            </div>
          </transition>
        </div>

      </div>

      <!-- middle pages -->
      <div class="flex">
        <div v-for="(i, index) in 9" :key="index">
          <button>
            {{ i }}
          </button>
        </div>
      </div>

      <!-- end page -->
      <div class="flex">
        <div class="flex justify-center items-center">
          <transition name="ellipsis">
            <div class="text-center w-[20px]">
              ···
            </div>
          </transition>

          <button class="flex justify-center items-center mx-1">1</button>
        </div>

        <button @mouseenter="rightArrorColor = 'white'" @mouseleave="rightArrorColor = '#7e56da'">
          <IconArrowRight class="h-2/3" :fill="rightArrorColor"></IconArrowRight>
        </button>
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { ref, Ref } from "vue"
import IconArrowLeft from '@/assets/icons/IconArrowLeft.vue';
import IconArrowRight from '@/assets/icons/IconArrowRight.vue';

const leftArrorColor: Ref<string> = ref("#7e56da")
const rightArrorColor: Ref<string> = ref("#7e56da")
</script>
  
<style lang="sass" scoped>
button 
  @apply w-[50px] h-[40px] bg-white p-2 flex justify-center items-center mx-1 text-xl rounded-md transition-all duration-300 border border-[#7e56da] text-[#7e56da] hover:border-white hover:bg-[#7e56da] hover:text-white

</style>