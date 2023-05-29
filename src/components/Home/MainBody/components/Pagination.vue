<template>
  <div class="w-full h-full flex justify-center items-center pb-10">
    <div class="flex justify-center items-center">
      <!-- start page -->
      <div class="flex justify-end w-[150px]">
        <button @mouseenter="leftArrorColor = 'white'" @mouseleave="leftArrorColor = '#7e56da'" @click="toPrePage">
          <IconArrowLeft class="h-2/3 transition-all duration-300" :fill="leftArrorColor"></IconArrowLeft>
        </button>

        <button :id="`${currentPage === 1 ? 'selected' : ''}`" @click="toSelectedPage(1)">1</button>

        <div v-show="pages > 10"
          class="flex justify-center items-center text-center text-[#7e56da] font-bold transition-all duration-300"
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
      <div class="flex justify-start w-[150px]">
        <div v-show="pages > 10"
          class="flex justify-center items-center text-center text-[#7e56da] font-bold transition-all duration-300"
          :style="{ width: `${hideRight ? '0px' : '20px'} `, opacity: `${hideRight ? '0' : '100'} ` }">
          ···
        </div>

        <button :id="`${currentPage === pages ? 'selected' : ''}`" @click="toSelectedPage(pages)">
          {{ pages }}
        </button>

        <button @mouseenter="rightArrorColor = 'white'" @mouseleave="rightArrorColor = '#7e56da'" @click="toNextPage">
          <IconArrowRight class="h-2/3" :fill="rightArrorColor"></IconArrowRight>
        </button>
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { ref, Ref, watch, onBeforeMount } from "vue"
import IconArrowLeft from '@/assets/icons/IconArrowLeft.vue';
import IconArrowRight from '@/assets/icons/IconArrowRight.vue';

const leftArrorColor: Ref<string> = ref("#7e56da")
const rightArrorColor: Ref<string> = ref("#7e56da")
const pages: Ref<number> = ref(20)
const middlePages: Ref<number[]> = ref([])
const currentPage: Ref<number> = ref(1)
const hideLeft: Ref<boolean> = ref(false)
const hideRight: Ref<boolean> = ref(false)

function calculateMiddlePages(middleIndex: number): void {
  middlePages.value = []
  let startIndex;
  let endIndex;

  if (pages.value <= 10) {
    // 当pages不足10页的时候
    // 直接显示所有页码
    startIndex = 2;
    endIndex = pages.value
  }
  else if (middleIndex <= 6) {
    // pages大于等于10页
    // 不考虑第一页
    // 目标页码左侧页数小于等于4页
    // 左侧不存在被隐藏的页码
    // 右侧存在被隐藏的页码
    startIndex = 2;
    endIndex = Math.min(pages.value, 11)
  }
  else if (middleIndex + 5 < pages.value) {
    // pages大于等于10页
    // 不考虑第一页
    // 目标页码左侧页数大于4页
    // 左侧存在被隐藏的页码
    // 右侧存在隐藏的页码
    startIndex = middleIndex - 4;
    endIndex = Math.min(pages.value, middleIndex + 5)
  }
  else {
    // pages大于等于10页
    // 不考虑第一页
    // 目标页码左侧页数大于4页
    // 左侧存在被隐藏的页码
    // 右侧不存在被隐藏的页码
    startIndex = middleIndex - 4 - (middleIndex + 5 - pages.value);
    endIndex = Math.min(pages.value, middleIndex + 5)
  }

  for (let i = startIndex; i < endIndex; i++) {
    middlePages.value.push(i)
  }
}

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

watch(
  () => currentPage.value,
  () => {
    calculateMiddlePages(currentPage.value)

    hideLeft.value = (currentPage.value > 6) ? true : false
    hideRight.value = (currentPage.value + 5 >= pages.value) ? true : false
  }
)

onBeforeMount(() => {
  calculateMiddlePages(null)
})
</script>
  
<style lang="sass" scoped>
*
  user-select: none

button 
  @apply w-[50px] h-[40px] p-2 flex justify-center items-center bg-white mx-1 text-xl rounded-md transition-all duration-300 border border-[#7e56da] text-[#7e56da] hover:border-white hover:bg-[#a984ff] hover:text-white

#selected
  @apply bg-[#7e56da] text-white border-white
</style>