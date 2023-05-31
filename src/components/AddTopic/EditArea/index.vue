<template>
  <div class="w-full h-full flex justify-center items-start">

    <div class="w-[90%] h-[90%] p-8">
      <Editor v-model="text" v-loading="true" api-key="tup1hjjciyq9wo6uus67ng0eemkjua5dprzb71dqrucrqh8y" class="h-full"
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
  </div>
</template>
  
<script setup lang='ts'>
import { ref, Ref } from "vue"
//@ts-ignore
import Editor from "@tinymce/tinymce-vue";

const text: Ref<string> = ref("")
const drawer: Ref<boolean> = ref(false)
</script>