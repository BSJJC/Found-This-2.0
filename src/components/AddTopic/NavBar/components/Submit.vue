<template>
  <div
    class="px-8 py-3 bg-[#7E56DA] rounded-xl text-white text-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#5833b0] hover:scale-105"
    @click="submit">
    SUBMIT
  </div>
</template>
  
<script setup lang='ts'>
import { useNewTopicInfo } from "@/stores/useNewTopicInfo"
import { storeToRefs } from "pinia";
// @ts-ignore
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import createNewTopic from "@/api/Topic/CreateNewTopic";

const { title, text, fileIDs } = storeToRefs(useNewTopicInfo())

/**
 * 发布话题
 */
async function submit(): Promise<void> {
  if (!title.value) {
    ElMessage({
      showClose: true,
      message: 'Title cannot be empty!',
      type: 'warning',
    })

    return
  }

  if (!text.value) {
    ElMessage({
      showClose: true,
      message: 'Text cannot be empty!',
      type: 'warning',
    })

    return
  }

  try {
    const founderName = JSON.parse(sessionStorage.getItem("userInfo")!).userName;
    const founderAvaterID = JSON.parse(sessionStorage.getItem("userInfo")!).userAvaterID;

    const info = {
      founderName,
      founderAvaterID,
      title: title.value,
      text: text.value,
      fileIDs: fileIDs.value
    }

    const response = await createNewTopic(info);

    if (response.data) {
      ElMessage({
        message: 'Topic released successfully!',
        type: 'success',
      })
    }
  } catch (e) {
    console.log(e);

    ElMessage({
      message: 'Topic released failed...',
      type: 'error',
    })
  }
}
</script>
  
<style lang="scss" scoped>
* {
  user-select: none;
  -webkit-user-select: none;
}
</style>