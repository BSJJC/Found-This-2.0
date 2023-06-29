<template>
  <div class="w-full h-[10%] flex justify-center items-center">
    <!-- 标题正文 -->
    <div class="w-1/4 text-4xl uppercase text-[#7e56da]">
      upload file
    </div>

    <!-- 文件上传状态 -->
    <div class="w-3/4 flex justify-end items-center transition-all duration-300 text-2xl pr-5 text-[#a6a9ad90]"
      :style="{ opacity: `${uploadStateArr.length === 0 ? '0' : '1'}` }">

      <Transition name="fade">
        <div class="flex flex-row ml-[20px] whitespace-nowrap">
          共
          <div class="text-[#7e56da] font-bold min-w-[20px] text-center">
            {{ uploadStateArr.length }}
          </div>
          个文件
        </div>
      </Transition>

      <Transition name="fade">
        <div v-show="uploading !== 0" class="flex flex-row ml-[20px] whitespace-nowrap">
          <div class="text-[#ebb563] font-bold min-w-[20px] text-center">
            {{ uploading }}
          </div>
          个正在上传
        </div>
      </Transition>

      <Transition name="fade">
        <div v-show="uploadSuccess !== 0" class="flex flex-row ml-[20px] whitespace-nowrap">
          <div class="text-[#85ce61] font-bold min-w-[20px] text-center">
            {{ uploadSuccess }}
          </div>
          个上传完成
        </div>
      </Transition>

      <Transition name="fade">
        <div v-show="uploadFails !== 0" class="flex flex-row ml-[20px] whitespace-nowrap">
          <div class="text-[#f78989] font-bold min-w-[20px] text-center">
            {{ uploadFails }}
          </div>
          个上传失败
        </div>
      </Transition>

    </div>

  </div>
</template>
  
<script setup lang='ts'>
import { computed, ComputedRef } from "vue"
import { storeToRefs } from "pinia";
import { useUploadStates } from "@/stores/useUploadStates"
import { uploadStates } from "@/types/Drawer"

const { uploadStateArr } = storeToRefs(useUploadStates())

const uploadSuccess: ComputedRef<number> = computed(() => {
  return uploadStateArr.value.filter(state => state === uploadStates.Success).length
})

const uploadFails: ComputedRef<number> = computed(() => {
  return uploadStateArr.value.filter(state => state === uploadStates.Fail).length
})

const uploading: ComputedRef<number> = computed(() => {
  return uploadStateArr.value.length - uploadSuccess.value - uploadFails.value;
})

</script>

<style lang="scss" scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  width: 0px;
  margin: 0px;
  padding: 0px;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  width: 110px;
  margin-left: 20px;
}
</style>