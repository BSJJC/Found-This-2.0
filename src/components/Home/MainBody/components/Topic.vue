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
import { onBeforeMount, ref, defineAsyncComponent } from "vue"
import getTopicInfo from '@/api/Topic/GetTopicInfo';
import Like from "@/assets/icons/iconLike.vue"
const Preview = defineAsyncComponent(() => import("./TopicComponents/Preview.vue"))

const info = ref()

const top = ref(0)
const left = ref(0)
const showPreview = ref(false)
const timer = ref()

function activePreview() {
  timer.value = setTimeout(() => {
    showPreview.value = true
  }, 500);
}

function closePreview() {
  clearTimeout(timer.value)
  showPreview.value = false
}

function caclPreviewLocation(e: MouseEvent) {
  top.value = e.y
  left.value = e.x
}


document.addEventListener("mousemove", caclPreviewLocation)

onBeforeMount(() => {
  getTopicInfo()
    .then(response => {
      info.value = response.data
    })
})
</script>