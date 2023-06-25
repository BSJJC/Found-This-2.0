<template>
  <div>

    <Uploading color="#7e56da" class="animate-bounce"></Uploading>

  </div>
</template>
  
<script setup lang='ts'>
import { uploadStates } from "../Types/index.ts"

import Uploading from "@/assets/icons/IconUpload.vue"

console.log(uploadStates);

</script>