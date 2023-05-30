<template>
  <div class="w-full h-full bg-red-300">

    <Editor v-model="editorText" class="h-full transition duration-300 ease absolute z-10"
      api-key="tup1hjjciyq9wo6uus67ng0eemkjua5dprzb71dqrucrqh8y" :init="{
        plugins:
          'preview importcss searchreplace autolink autosave  directionality code visualblocks visualchars fullscreen link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
        toolbar:
          'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview  print | link anchor codesample | ltr rtl',
        toolbar_sticky: true,
        contextmenu: 'link table',
        language: '',
        resize: false,
        skin: 'oxide',
        content_css: 'light',
      }" />

  </div>
</template>
  
<script setup lang='ts'>
//@ts-ignore
import Editor from "@tinymce/tinymce-vue";

</script>
  
<style></style>