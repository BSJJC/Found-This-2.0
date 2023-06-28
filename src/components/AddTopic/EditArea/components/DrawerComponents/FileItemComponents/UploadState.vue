<template>
  <div>
    <Transition>
      <Uploading v-if="props.uploadState === uploadStates.Pending" color="#7e56da" class="animate-bounce">
      </Uploading>
      <Success v-else-if="props.uploadState === uploadStates.Success" color="#85ce61"></Success>
      <Warning v-else-if="props.uploadState === uploadStates.Fail" color="#f78989"></Warning>
    </Transition>
  </div>
</template>
  
<script setup lang='ts'>
import { defineAsyncComponent } from "vue"
import { uploadStates } from "@/types/Drawer"

const Uploading = defineAsyncComponent(() => import("@/assets/icons/IconUpload.vue"))
const Success = defineAsyncComponent(() => import("@/assets/icons/IconCheck.vue"))
const Warning = defineAsyncComponent(() => import("@/assets/icons/IconWarning.vue"))

interface Config {
  uploadState: uploadStates
}

const props = defineProps<Config>()
</script>

<style lang="scss" scoped>
.v-enter-active {
  transition: all 0.3s ease-in-out;
}

.v-leave-active {
  position: absolute;
  transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>