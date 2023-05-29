<template>
  <div class="w-full h-full flex justify-center items-center pb-10">
    <div class="flex justify-center items-center">
      <!-- start page -->
      <div class="flex">
        <button @mouseenter="leftArrorColor = 'white'" @mouseleave="leftArrorColor = '#7e56da'" @click="toPrePage">
          <IconArrowLeft class="h-2/3 transition-all duration-300" :fill="leftArrorColor"></IconArrowLeft>
        </button>

        <button :id="`${currentPage === 1 ? 'selected' : ''}`" @click="toSelectedPage(1)">1</button>

        <div class="flex justify-center items-center text-center text-[#7e56da] font-bold transition-all duration-300"
          :style="{ width: `${hideLeft ? '20px' : '0px'}`, opacity: `${hideLeft ? '100' : '0'}` }">
          ···
        </div>
      </div>

      <!-- middle pages -->
      <div class="flex">
        <div v-for="(i, index) in middlePages" :key="index">
          <button :id="`${i === currentPage ? 'selected' : ''}`" @click="toSelectedPage(i)">
            {{ i }}
          </button>
        </div>
      </div>

      <!-- end page -->
      <div class="flex">
        <div v-show="pages > 10 && hideRight === false"
          class="flex justify-center items-center text-center text-[#7e56da] font-bold transition-all duration-300"
          :style="{ width: `${hideRight ? '0px' : '20px'} `, opacity: `${hideRight ? '0' : '100'} ` }">
          ···
        </div>

        <button v-show="pages > 10" :id="`${currentPage === pages ? 'selected' : ''}`" @click="toSelectedPage(pages)">{{
          pages
        }}</button>

        <button @mouseenter="rightArrorColor = 'white'" @mouseleave="rightArrorColor = '#7e56da'" @click="toNextPage">
          <IconArrowRight class="h-2/3" :fill="rightArrorColor"></IconArrowRight>
        </button>
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { ref, Ref, ComputedRef } from "vue"
import IconArrowLeft from '@/assets/icons/IconArrowLeft.vue';
import IconArrowRight from '@/assets/icons/IconArrowRight.vue';
import { computed } from "vue";

const leftArrorColor: Ref<string> = ref("#7e56da")
const rightArrorColor: Ref<string> = ref("#7e56da")
const pages: Ref<number> = ref(15)
const hideLeft: Ref<boolean> = ref(false)
const hideRight: Ref<boolean> = ref(false)
const currentPage: Ref<number> = ref(1)

const middlePages: ComputedRef<number[]> = computed((): number[] => {
  const arr = []

  for (let i = 2; i < Math.min(pages.value, 11); i++) {
    arr.push(i)
  }

  return arr
})

function toPrePage(): void {
  if (currentPage.value - 1 !== 0) {
    currentPage.value--
  }
}

function toNextPage(): void {
  if (currentPage.value + 1 !== pages.value + 1) {
    currentPage.value++
  }
}

function toSelectedPage(index: number): void {
  currentPage.value = index;
}
</script>
  
<style lang="sass" scoped>
*
  user-select: none

button 
  @apply w-[50px] h-[40px] p-2 flex justify-center items-center bg-white mx-1 text-xl rounded-md transition-all duration-300 border border-[#7e56da] text-[#7e56da] hover:border-white hover:bg-[#a984ff] hover:text-white

#selected
  @apply bg-[#7e56da] text-white border-white
</style>