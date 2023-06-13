<template>
  <el-scrollbar height="100%">
    <div class="w-full h-full flex justify-start items-center px-5 flex-wrap flex-row relative">
      <Control></Control>

      <Topics v-for="(i, index) in topicsInfo" :key="index" :data="i" :id="index" @click="zoomIn(index)"></Topics>

      <template v-if="showTransform">
        <Transform :randomIDs="randomIDs" :states="states">

          <template #origin>
            <Topics :data="topicsInfo![selectedTopicId]" :id="randomIDs[0]"
              class="transition-all duration-500 ease-in-out z-[100]"></Topics>
          </template>

          <template #target></template>

        </Transform>
      </template>
    </div>

    <Pagination :page-size="4" :page-counts="10"></Pagination>
  </el-scrollbar>
</template>
  
<script setup lang='ts'>
import { ref, Ref, defineAsyncComponent, onMounted } from "vue"

import Topics from "./components/Topics.vue"
import Pagination from "./components/Pagination.vue"
import Control from "./components/Control.vue"

const Transform = defineAsyncComponent(() => import("@/components/Common/Transform.vue"))

interface Config {
  founderName: string,
  founderAvaterID: string,
  title: string,
  text: string,
  likes: number,
  dislikes: number,
  replies: number,
  views: number
  bgID: string,
  appendixIDs: Array<string>,
}

const topicsInfo: Ref<Config[] | undefined> = ref()

const selectedTopicId = ref()
const selectedTopicElement: Ref<HTMLElement | undefined> = ref()
const showTransform = ref(false)
const randomIDs: string[] = [Math.random().toString(), Math.random().toString()]
const states = ref({
  startWidth: 0,
  startHeight: 0,
  startTop: 0,
  startLeft: 0,
  endWidth: 0,
  endHeight: 0
})

/**
 * 获取保存在本地的topicinfo
 */
function getTopicInfo() {
  setTimeout(() => {
    topicsInfo.value = JSON.parse(sessionStorage.getItem("topicsInfo")!)
  }, 500);
}

/**
 * 
 * @param index d
 */
function zoomIn(index: number) {
  selectedTopicId.value = index

  selectedTopicElement.value = document.getElementById(index.toString()) as HTMLElement
  selectedTopicElement.value!.style.opacity = "0"

  const rect: DOMRect = selectedTopicElement.value.getBoundingClientRect();

  const { width, height, top, left } = rect;

  states.value.startWidth = width
  states.value.startHeight = height
  states.value.startTop = top
  states.value.startLeft = left

  states.value.endWidth = 70
  states.value.endHeight = 70

  showTransform.value = true
}

onMounted(() => {
  getTopicInfo()
})
</script>