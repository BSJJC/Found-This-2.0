<template>
  <div class="w-full h-full flex justify-center items-center pb-10">
    <div class="flex justify-center items-center">
      <!-- start page -->
      <div class="flex justify-end w-[150px] bg-red-300">
        <button @mouseenter="leftArrorColor = 'white'" @mouseleave="leftArrorColor = '#7e56da'" @click="toPrePage">
          <IconArrowLeft class="h-2/3 transition-all duration-300" :fill="leftArrorColor"></IconArrowLeft>
        </button>

        <button :id="`${currentPage === 1 ? 'selected' : ''}`" @click="toSelectedPage(1)">1</button>

        <div v-show="pageCounts > 0"
          class="flex justify-center items-center text-center text-[#7e56da] font-bold transition-all duration-300"
          :style="{ width: `${hasLeftHidden ? '20px' : '0px'}`, opacity: `${hasLeftHidden ? '100' : '0'}` }">
          ···
        </div>
      </div>

      <!-- middle pages -->
      <div class="flex">
        <div v-for="(i, index) in pages" :key="index">
          <button :id="`${i === currentPage ? 'selected' : ''}`" @click="toSelectedPage(i)">
            {{ i }}
          </button>
        </div>
      </div>

      <!-- end page -->
      <div class="flex justify-start w-[150px] bg-blue-300">
        <div v-show="pageCounts > pageSize + 1"
          class="flex justify-center items-center text-center text-[#7e56da] font-bold transition-all duration-300"
          :style="{ width: `${hasRightHidden ? '20px' : '0px'} `, opacity: `${hasRightHidden ? '100' : '0'} ` }">
          ···
        </div>

        <button v-if="pageCounts > 1" :id="`${currentPage === pageCounts ? 'selected' : ''}`"
          @click="toSelectedPage(pageCounts)">
          {{ pageCounts }}
        </button>

        <button @mouseenter="rightArrorColor = 'white'" @mouseleave="rightArrorColor = '#7e56da'" @click="toNextPage">
          <IconArrowRight class="h-2/3" :fill="rightArrorColor"></IconArrowRight>
        </button>
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { ref, Ref, watch, onMounted } from "vue"
import IconArrowLeft from '@/assets/icons/IconArrowLeft.vue';
import IconArrowRight from '@/assets/icons/IconArrowRight.vue';

interface Config {
  pageSize: number      //每页显示的条目数量
  pageCounts: number //总页数
}

const props = defineProps<Config>()

const leftArrorColor: Ref<string> = ref("#7e56da")
const rightArrorColor: Ref<string> = ref("#7e56da")
const pageSize = props.pageSize;
const pageCounts = props.pageCounts
const pageCountsArr: number[] = []
const pages: Ref<number[]> = ref([])
const currentPage: Ref<number> = ref(10)
const hasLeftHidden: Ref<boolean> = ref(false)
const hasRightHidden: Ref<boolean> = ref(false)

function calculatePages(): void {
  const _currentPage = currentPage.value - 1;
  let lastSize = pageSize - 1;

  const leftArr = []
  const rightArr = []
  let direction = "left"
  let rounds = 1

  while (lastSize !== 0) {
    if (direction === 'left') {
      const el = pageCountsArr[_currentPage - rounds]

      if (el === undefined) {
        direction = 'right'
        continue;
      }

      leftArr.unshift(el)

      direction = 'right'
      lastSize--;
    }

    if (direction === 'right') {
      const el = pageCountsArr[_currentPage + rounds]

      if (el === undefined) {
        direction = 'left';
        rounds++
        continue
      }

      rightArr.push(el)

      direction = 'left'
      lastSize--;
      rounds++;
    }
  }


  console.log(leftArr);
  console.log(pageCountsArr[_currentPage]);
  console.log(rightArr);


}

function toPrePage(): void {
  if (currentPage.value - 1 !== 0) {
    currentPage.value--
  }
}

function toNextPage(): void {
  if (currentPage.value + 1 !== pageCounts + 1) {
    currentPage.value++
  }
}

function toSelectedPage(index: number): void {
  currentPage.value = index;
}

watch(
  () => currentPage.value,
  () => {
    calculatePages()
  }
)

onMounted(() => {
  for (let i = 1; i < pageCounts + 1; i++) {
    pageCountsArr.push(i)
  }

  calculatePages();
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