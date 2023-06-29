<template>
  <Transition>
    <div v-if="show"
      class=" absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#00000050] z-[50] overflow-scroll"
      @click.self="hidePreview">
      <img ref="previewImgRef" :src="previewImgUrl" class="absolute transition-all duration-500 rounded-lg">
    </div>
  </Transition>
</template>
  
<script setup lang='ts'>
import { ref, Ref, nextTick, onMounted } from "vue"
// @ts-ignore
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

import compressImage from "@/utils/compressImage"
import { fileItemType, compressedImagesType } from "@/types/Drawer"

interface Config {
  uuid: string,
  index: number,
  fileList: fileItemType[],
  compressImages: compressedImagesType[]
}
const props = defineProps<Config>()
const emits = defineEmits(["destroyPreview"])

const animationPlaying: Ref<boolean> = ref(false)
const show = ref(false)
const originalImgRef: Ref<HTMLImageElement | undefined> = ref()
const previewImgRef: Ref<HTMLImageElement | undefined> = ref()

const previewImgUrl = ref("")
const previewImgStates = ref({
  startWidth: 0,
  startTop: 0,
  startLeft: 0
})

/**
 * 挂载完成后初始化 preview image 的位置
 * 对过大图片进行压缩处理
 * 再根据图片长宽比对确定图片最终显示位置
 */
onMounted(async () => {
  show.value = true
  animationPlaying.value = true

  originalImgRef.value = document.getElementById(props.uuid) as HTMLImageElement

  const rect: DOMRect = originalImgRef.value.getBoundingClientRect();

  const { width, height, top, left } = rect as {
    width: number, height: number, top: number, left: number
  }

  previewImgStates.value.startWidth = width
  previewImgStates.value.startTop = top
  previewImgStates.value.startLeft = left

  await nextTick()

  previewImgRef.value!.style.width = width.toString() + "px"
  previewImgRef.value!.style.top = (top + 8).toString() + "px" // 因为原本的样式设定中，hover后会向上translate 8px，所有这里需要 +8px，以免动画衔接不够顺滑
  previewImgRef.value!.style.left = left.toString() + "px"

  let file: File = props.fileList[props.index]

  // 文件大于1Mb，压缩后展示
  if (file.size / 1024 > 1024) {
    await compressImage(file, 1280, 720)
      .then(_file => {
        file = _file
      })

    ElMessage({
      message: '图片过大，展示压缩后图片',
      type: 'warning',
    })
  }

  previewImgUrl.value = URL.createObjectURL(file)

  setTimeout(() => {
    originalImgRef.value!.style.opacity = "0"

    if (width / height <= 1) {
      // 长宽比小于等于1的图片
      previewImgRef.value!.style.width = "50vw"
      previewImgRef.value!.style.top = "0px"
      previewImgRef.value!.style.left = `25vw`
    }
    else {
      // 长宽比大于1的图片
      previewImgRef.value!.style.width = "80vw"
      previewImgRef.value!.style.top = "10vh"
      previewImgRef.value!.style.left = `10vw`
    }
  }, 300);

  setTimeout(() => {
    animationPlaying.value = false
  }, 800);
})

/**
 * 隐藏preview image
 * 将位置，大小恢复至初始值
 * 并在图片完全恢复初始值后销毁图片
 * 最后调用父组件传入的destroyPreview方法，销毁组件
 */
function hidePreview(): void {
  if (animationPlaying.value) return

  const { startWidth, startTop, startLeft } = previewImgStates.value

  previewImgRef.value!.style.width = startWidth.toString() + "px"
  // 因为原本的样式设定中，hover后会向上translate 8px，所有这里需要 +8px，以免动画衔接不够顺滑
  previewImgRef.value!.style.top = (startTop + 8).toString() + "px"
  previewImgRef.value!.style.left = startLeft.toString() + "px"

  setTimeout(() => {
    originalImgRef.value!.style.opacity = "100"

    previewImgUrl.value = ""
    show.value = false
  }, 500);

  setTimeout(() => {
    emits("destroyPreview")
  }, 600);
}
</script>
  
<style lang="scss" scoped>
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

// 隐藏preview-img的竖向滚动条
div {
  -ms-overflow-style: none !important;
  /* for Internet Explorer, Edge */
  scrollbar-width: none !important;
  /* for Firefox */
  overflow-y: scroll !important;
}

// 隐藏preview-img的竖向滚动条
div::-webkit-scrollbar {
  display: none !important;
  /* for Chrome, Safari, and Opera */
}
</style>