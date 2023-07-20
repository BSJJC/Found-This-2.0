<template>
  <div class="flex justify-start items-center flex-col w-full min-h-[200px] py-[20px]">

    <div v-for="(i, index) in info" :key="index" @mouseenter="activePreview" @mouseleave="closePreview"
      class="w-[95%] h-[60px] flex justify-start items-center bg-[#7e56da] text-white text-[1.5rem] py-2 px-8 rounded-lg mb-2 cursor-pointer transition-all duration-300 opacity-80 hover:opacity-100">

      <img :src="`http://localhost:5000/api/userAvaters/get/${i.founderAvaterID}`" alt="topic founder avater"
        class="h-full rounded-full">

      <div class="w-[20%] text-center">
        title
      </div>

      <div class="w-[20%] text-center">
        founder name
      </div>

      <div class="w-[10%] flex justify-start items-center text-center">
        <Like fill="white" color="" class="h-[30px]"></Like>
        {{ i.likes }}
      </div>

      <div class="w-[10%] flex justify-start items-center text-center">
        <Like fill="white" class="h-[30px] rotate-180"></Like>
        {{ i.dislikes }}
      </div>
    </div>

    <Preview v-show="showPreview" :style="{ top: `${top}px`, left: `${left}px` }" class="fixed"></Preview>

  </div>
</template>
  
<script setup lang='ts'>
import { onBeforeMount, ref, Ref, defineAsyncComponent } from "vue"
import getTopicInfo from '@/api/Topic/GetTopicInfo';
import Like from "@/assets/icons/iconLike.vue"
const Preview = defineAsyncComponent(() => import("./TopicComponents/Preview.vue"))

const info = ref()

const top: Ref<number> = ref(0)
const left: Ref<number> = ref(0)
const showPreview: Ref<Boolean> = ref(false)
const timer = ref()

/**
 * 显示 Preview 组件
 */
function activePreview(): void {
  if (showPreview.value) return

  showPreview.value = true
}

/**
 * 关闭 Preview 组件
 */
function closePreview(): void {
  clearTimeout(timer.value)
  showPreview.value = false
}

/**
 * 根据鼠标移动位置修改 Preview 组件位置
 * @param e 鼠标移动事件
 */
function caclPreviewLocation(e: MouseEvent): void {
  top.value = e.y + 10
  left.value = e.x - 100
}

document.addEventListener("mousemove", caclPreviewLocation)

onBeforeMount(() => {
  getTopicInfo()
    .then(response => {
      info.value = response.data
    })
})
</script>