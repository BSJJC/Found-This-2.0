<template>
  <el-scrollbar height="100%">
    <div class="w-full h-full flex justify-start items-center px-5 pt-10 flex-wrap flex-row">
      <Topics v-for="(i, index) in topicsInfo" :key="index" :data="i"></Topics>
    </div>

    <Pagination :page-size="5" :page-counts="10"></Pagination>
  </el-scrollbar>
</template>
  
<script setup lang='ts'>
import { ref, Ref, defineAsyncComponent, onBeforeMount } from "vue"

const Topics = defineAsyncComponent(() => import("./components/Topics.vue"))
const Pagination = defineAsyncComponent(() => import("./components/Pagination.vue"))

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

function getTopicInfo() {
  topicsInfo.value = JSON.parse(sessionStorage.getItem("topicsInfo")!)
}

onBeforeMount(() => {
  getTopicInfo()
})
</script>