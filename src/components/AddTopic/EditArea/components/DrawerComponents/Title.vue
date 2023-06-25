<template>
  <div class="w-full h-[10%] flex justify-center items-center">
    <!-- 标题正文 -->
    <div class="w-1/2 text-4xl text-[#7e56da]">
      Upload Attachment
    </div>

    <!-- 文件上传状态 -->
    <div class="w-1/2">
      {{ uploadFileStatus.length }}
    </div>

  </div>
</template>
  
<script setup lang='ts'>
import { ref } from "vue"

const uploadFileStatus = ref([])
</script>