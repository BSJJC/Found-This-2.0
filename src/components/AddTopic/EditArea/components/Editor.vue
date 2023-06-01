<template>
  <Editor v-model="text" api-key="tup1hjjciyq9wo6uus67ng0eemkjua5dprzb71dqrucrqh8y" :init="{
    toolbar:
      'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify| numlist bullist | forecolor backcolor | link codesample',
    toolbar_sticky: false,
    language: 'zh_CN',
    resize: false,
    skin: 'oxide',
    content_css: 'light',
  }" />
</template>
  
<script setup lang='ts'>
import { ref, Ref } from "vue"
import Editor from "@tinymce/tinymce-vue";

const text: Ref<string> = ref("dsadsa")
</script>
  
<style></style>