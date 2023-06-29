<template>
  <div class="relative">

    <div
      class="absolute flex flex-col justify-center items-center text-[5rem] font-bold text-white w-full h-full bg-[#7e56da] rounded-lg">
      <div class="animate-bounce">
        Loading...
      </div>

      <div class="text-[2rem]">If the loading is not completed for a long time, please refresh the page 🥺</div>
    </div>

    <Editor v-model="text" class="h-full absolute" :init="{
      toolbar:
        'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify| numlist bullist | forecolor backcolor | link codesample',
      toolbar_sticky: false,
      language: 'zh_CN',
      resize: false,
      skin: 'oxide',
      content_css: 'light',
    }" />
  </div>
</template>
  
<script setup lang='ts'>
import Editor from "@tinymce/tinymce-vue";
import { useNewTopicInfo } from "@/stores/useNewTopicInfo"
import { storeToRefs } from "pinia";

const { text } = storeToRefs(useNewTopicInfo())
</script>