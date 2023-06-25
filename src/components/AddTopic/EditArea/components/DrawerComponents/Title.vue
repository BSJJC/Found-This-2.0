<template>
  <div class="w-full h-[10%] flex justify-center items-center">
    <div class="w-1/2 text-4xl text-[#7e56da]">
      Upload Attachment
    </div>

    <!-- uploadd status -->
    <div class="w-1/2">
      {{ uploadFileStatus.length }}
    </div>

  </div>
</template>
  
<script setup lang='ts'>
import { ref } from "vue"

const uploadFileStatus = ref([])
</script>