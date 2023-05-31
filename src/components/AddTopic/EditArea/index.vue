<template>
  <div class="w-full h-full  p-8">

    <el-button @click="drawer = !drawer">switch</el-button>
    <el-drawer v-model="drawer"></el-drawer>

    <Editor v-model="text" v-loading="true" api-key="tup1hjjciyq9wo6uus67ng0eemkjua5dprzb71dqrucrqh8y" class="h-[90%]"
      :init="{
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
import { ref, Ref } from "vue"
//@ts-ignore
import Editor from "@tinymce/tinymce-vue";

const text: Ref<string> = ref("")
const drawer: Ref<boolean> = ref(false)
</script>