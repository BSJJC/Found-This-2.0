<template>
  <div
    class="px-8 py-3 bg-[#7E56DA] rounded-xl text-white text-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#5833b0] hover:scale-105"
    @click="submit">
    SUBMIT
  </div>

  <Teleport to="body">
    <Transition name="submit">
      <div v-if="submiting"
        class="z-[500] absolute top-0 left-0 w-screen h-screen bg-[#fff33350] flex justify-center items-center">
        <div class="inner w-2/3 h-2/3 bg-red-300">
          123
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
  
<script setup lang='ts'>
import { ref, Ref } from "vue"
import { useNewTopicInfo } from "@/stores/useNewTopicInfo"
import { storeToRefs } from "pinia";
// @ts-ignore
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import createNewTopic from "@/api/Topic/CreateNewTopic";

const { title, text, fileIDs } = storeToRefs(useNewTopicInfo())
const submiting: Ref<boolean> = ref(false)

/**
 * 发布话题
 */
async function submit(): Promise<void> {

  submiting.value = true

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

.submit-enter-active,
.submit-leave-active {
  transition: all 0.3s ease-in-out;
}

.submit-enter-from,
.submit-leave-to {
  opacity: 0;
}
</style>