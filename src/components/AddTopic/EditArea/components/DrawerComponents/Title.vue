<template>
  <div class="w-full h-[10%] flex justify-center items-center px-4">
    <!-- 标题正文 -->
    <div class="w-1/2 text-4xl uppercase text-[#7e56da]">
      upload file
    </div>

    <!-- 文件上传状态 -->
    <div class="w-1/2 flex justify-end items-center bg-red-300">
      {{ uploadStateArr.length }}
      {{ uploadSuccess.length }}
    </div>

  </div>
</template>
  
<script setup lang='ts'>
import { computed } from "vue"
import { storeToRefs } from "pinia";
import { useUploadStates } from "@/stores/useUploadStates"

enum uploadStates {
  Pending = "pending",
  Success = "success",
  Fail = "fail"
}

const { uploadStateArr } = storeToRefs(useUploadStates())

const uploadSuccess = computed(() => {
  return uploadStateArr.value.filter(state => {
    state === uploadStates.Success
  })
})


</script>