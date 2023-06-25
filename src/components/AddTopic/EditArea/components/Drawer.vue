<template>
  <!-- msak -->
  <Transition>
    <div v-show="showDrawer" class="fixed top-0 bg-[#00000080] w-screen h-screen  transition-all duration-500 z-[100]"
      @click="show"></div>
  </Transition>

  <!-- main drawer -->
  <div
    class=" fixed top-0 left-0 w-1/2 h-screen flex justify-start items-start p-10 bg-white shadow-[#7e56da] shadow-2xl z-[100] transition-all duration-500"
    :style="{ left: `${showDrawer ? '' : '-50%'}` }">

    <div class="w-full h-full flex justify-center items-center flex-col">
      <!-- title -->
      <Title></Title>

      <!-- selected rendered files -->
        <FileItem></FileItem>
    </div>

    <!-- pewview img area -->
    <Transition>
      <div v-if="showTransform" id="preview-img-container"
        class=" absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#00000050] z-[50] overscroll-auto"
        @click.self="hideImgPreview">
        <img ref="previewImgRef" :src="previewImgUrl" class="absolute transition-all duration-500 rounded-lg">
      </div>
    </Transition>

    <!-- switch button -->
    <div
      class="absolute flex flex-col justify-center items-center bg-[#7e56da] cursor-pointer rounded-r-lg text-xl text-white overflow-hidden transition-all duration-500 left-full p-4 hover:pl-[40px] top-[30%]"
      :style="{
        top: `${showDrawer ? '0px' : ''}`, height: `${showDrawer ? '50px' : '300px'}`
      }" @click="show">

      <TransitionGroup>
        <span v-for="(char, index) in sentence" :key="index">
          {{ char }}
        </span>
      </TransitionGroup>

    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { ref, Ref, computed, ComputedRef, defineAsyncComponent } from "vue"

//@ts-ignore
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

const Title = defineAsyncComponent(() => import("./DrawerComponents/Title.vue"))
const FileItem = defineAsyncComponent(() => import("./DrawerComponents/FileItem.vue"))

// const Upload = defineAsyncComponent(() => import("@/assets/icons/IconUpload.vue"))
// const Check = defineAsyncComponent(() => import("@/assets/icons/IconCheck.vue"))
// const Warning = defineAsyncComponent(() => import("@/assets/icons/IconWarning.vue"))

const showDrawer: Ref<boolean> = ref(true)
const sentence: ComputedRef<"X" | "Attachment"> = computed(() => {
  if (showDrawer.value) {
    return "X"
  }
  else {
    return "Attachment"
  }
})

const showTransform: Ref<boolean> = ref(false)
const playingAnimation: Ref<boolean> = ref(false)
const originalImgRef: Ref<HTMLImageElement | undefined> = ref()
const previewImgRef: Ref<HTMLImageElement | undefined> = ref()
const previewImgUrl = ref("")
const previewImgStates = ref({
  startWidth: 0,
  startTop: 0,
  startLeft: 0
})

/**
 * 展示drawer
 */
function show(): void {
  showDrawer.value = !showDrawer.value
}

/**
 * 隐藏图片预览
 */
function hideImgPreview(): void {
  if (playingAnimation.value) return

  const { startWidth, startTop, startLeft } = previewImgStates.value

  previewImgRef.value!.style.width = startWidth.toString() + "px"
  // 因为原本的样式设定中，hover后会向上translate 8px，所有这里需要 +8px，以免动画衔接不够顺滑
  previewImgRef.value!.style.top = (startTop + 8).toString() + "px"
  previewImgRef.value!.style.left = startLeft.toString() + "px"

  setTimeout(() => {
    originalImgRef.value!.style.opacity = "100"

    previewImgUrl.value = ""
    showTransform.value = false
  }, 500);
}
</script>

<style lang="scss" scoped>
* {
  user-select: none;
  -webkit-user-select: none;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}

.v-leave-active {
  position: absolute;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}




.endered-files-leave-active {
  position: absolute;
}

// 隐藏preview-img的竖向滚动条
#preview-img-container {
  -ms-overflow-style: none !important;
  /* for Internet Explorer, Edge */
  scrollbar-width: none !important;
  /* for Firefox */
  overflow-y: scroll !important;
}

// 隐藏preview-img的竖向滚动条
#preview-img-container::-webkit-scrollbar {
  display: none !important;
  /* for Chrome, Safari, and Opera */
}
</style>