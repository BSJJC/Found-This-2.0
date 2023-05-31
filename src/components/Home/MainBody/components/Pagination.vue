<template>
  <div class="w-full h-full flex justify-center items-center pb-10">
    <div class="flex justify-center items-center">
      <!-- start page -->
      <div class="flex justify-end w-[150px]">
        <button @mouseenter="leftArrorColor = 'white'" @mouseleave="leftArrorColor = '#7e56da'" @click="toPrePage">
          <IconArrowLeft class="h-2/3 transition-all duration-300" :fill="leftArrorColor"></IconArrowLeft>
        </button>

        <button :id="`${currentPage === 1 ? 'selected' : ''}`" @click="toSelectedPage(1)">{{ pages[0] }}</button>

        <div class="flex justify-center items-center text-center text-[#7e56da] font-bold transition-all duration-300"
          :style="{ width: `${pages[1] !== 2 ? '20px' : '0px'}`, opacity: `${pages[1] !== 2 ? '100' : '0'}` }">
          ···
        </div>
      </div>

      <!-- middle pages -->
      <div class="flex">
        <div v-for="(i, index) in pages.slice(1, pages.length - 1)" :key="index">
          <button :id="`${i === currentPage ? 'selected' : ''}`" @click="toSelectedPage(i)">
            {{ i }}
          </button>
        </div>
      </div>

      <!-- end page -->
      <div class="flex justify-start w-[150px]">
        <div class="flex justify-center items-center text-center text-[#7e56da] font-bold transition-all duration-300"
          :style="{
            width: `${pages[pages.length - 2] !== pages[pages.length - 1] - 1 ? '20px' : '0px'} `,
            opacity: `${pages[pages.length - 2] !== pages[pages.length - 1] - 1 ? '100' : '0'} `
          }">
          ···
        </div>

        <button v-if="pageCounts > 1" :id="`${currentPage === pageCounts ? 'selected' : ''}`"
          @click="toSelectedPage(pageCounts)">
          {{ pages[pages.length - 1] }}
        </button>

        <button @mouseenter="rightArrorColor = 'white'" @mouseleave="rightArrorColor = '#7e56da'" @click="toNextPage">
          <IconArrowRight class="h-2/3" :fill="rightArrorColor"></IconArrowRight>
        </button>
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { ref, Ref, watch } from "vue"
import IconArrowLeft from '@/assets/icons/IconArrowLeft.vue';
import IconArrowRight from '@/assets/icons/IconArrowRight.vue';

interface Config {
  pageSize: number      //每页显示的条目数量
  pageCounts: number //总页数
}

const props = defineProps<Config>()

const leftArrorColor: Ref<string> = ref("#7e56da")
const rightArrorColor: Ref<string> = ref("#7e56da")
const pageSize: number = props.pageSize;
const pageCounts: number = props.pageCounts
const pages: Ref<number[]> = ref([])
const currentPage: Ref<number> = ref(1)

/**
 * 计算需要展示的页码
 * 具体为一个number类型的数组
 * 
 * 例如
 * 当pageSize为3，pageCounts为10，currentPage为1时
 * pages为[1，2，3，4，10]
 */
function calculatePages(): void {
  /**
   * 清空所展示的所有页码
   */
  pages.value = []


  /**
   * 当可以一次性展示所有页码的时候
   * 无需多余的计算
   * 直接返回所有页码
   */
  if (pageCounts <= pageSize) {
    const arr: number[] = [];
    for (let i = 1; i < pageCounts; i++) {
      arr.push(i)
    }

    pages.value = arr;
    return
  }


  /**
   * pageSize实际上并不是实际展示的所有页码的数量
   * 
   * 例如
   * 当pageSize为5，pageCounts为10时，实际上展示的所有页码为
   * [1,2,3,4,5,6,10]
   * 一共展示了7页
   * 
   * lastSize也就是指为了能展示7页，还需要添加的页码的数量
   * 而且因为当前所展示的页面一定包含在pageSize中
   * 所以不需要+2
   * 只需要+1即可
   */
  let lastSize = pageSize + 1;


  let result: number[] = []
  const leftArr: number[] = []
  const rightArr: number[] = []
  let direction: 'left' | "right" = "left"
  let rounds: number = 1

  /**
   * 使用双指针找出currentPage左右符合条件的数
   * 并转入leftArr和rightArr中
   * 默认当 pageSize为双数时左侧显示的页码更多
   */
  while (lastSize > 0) {
    if (direction === 'left') {
      const el = currentPage.value - rounds

      if (el < 1) {
        direction = 'right'
        continue;
      }

      leftArr.unshift(el)

      direction = 'right'
      lastSize--;
    }

    if (direction === 'right') {
      const el = currentPage.value + rounds

      if (el > pageCounts) {
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

  result = [...leftArr, currentPage.value, ...rightArr]

  /**
   * 当pageSize为偶数时
   * result的length会币pageSize+1还要大1
   * 所以pop掉最后一个元素
   */
  if (result.length > pageSize + 2) {
    result.pop()
  }

  /**
   * typescript中
   * 给出数组arr [1,2,3,4,5,6,7,8,9,10]
   * 以及targetIndex
   * 要求以数组格式返回targetIndex本身以及左右两侧各两个数
   * 不能越界
   */

  /**
   * 无论如何第一个页码必须为1
   * 所以如果result的第一个元素部位1
   * 则把第一个元素变成1
   */
  if (result[0] !== 1) {
    result[0] = 1
  }


  /**
   * 无论如何最后一个元素必须为pageCounts
   * 所以如果最后一个元素部位pageCounts
   * 则把最后一个元素变成pageCounts
   */
  if (result[result.length - 1] !== pageCounts) {
    result[result.length - 1] = pageCounts
  }

  pages.value = result
}

/**
 * 前往下一页
 */
function toPrePage(): void {
  if (currentPage.value - 1 !== 0) {
    currentPage.value--
  }
}

/**
 * 前往上一页
 */
function toNextPage(): void {
  if (currentPage.value + 1 !== pageCounts + 1) {
    currentPage.value++
  }
}

/**
 * 前往指定页码
 * @param index 所需要前往的具体页码
 */
function toSelectedPage(index: number): void {
  currentPage.value = index;
}

watch(
  () => currentPage.value,
  () => {
    calculatePages()
  },
  {
    immediate: true
  }
)
</script>
  
<style lang="sass" scoped>
*
  user-select: none

button 
  @apply w-[50px] h-[40px] p-2 flex justify-center items-center bg-white mx-1 text-xl rounded-md transition-all duration-300 border border-[#7e56da] text-[#7e56da] hover:border-white hover:bg-[#a984ff] hover:text-white

#selected
  @apply bg-[#7e56da] text-white border-white
</style>