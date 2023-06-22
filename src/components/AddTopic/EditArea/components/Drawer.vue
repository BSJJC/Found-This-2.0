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
      <div class="w-full h-[10%] flex justify-center items-center">
        <div class="w-1/2 text-4xl text-[#7e56da]">
          Upload Attachment
        </div>

        <!-- uploadd status -->
        <div class="w-1/2">
          {{ uploadFileStatus.length }}
        </div>

      </div>

      <!-- selected rendered files -->
      <el-scrollbar height="100%" class="w-full">
        <div class="w-full h-[90%] flex justify-start items-center flex-wrap py-5 pr-4">
          <!-- rendered files -->
          <TransitionGroup name="rendered-files">
            <div v-for="(i, index) in renderedFiles" :key="renderedFiles[index].uuid" :id="i.uuid"
              class="w-full h-[100px] flex justify-center items-center p-2 my-2 border-[2px] rounded-xl overflow-hidden transition-all duration-300 group hover:-translate-y-2 hover:border-[#7e56da] hover:shadow-[#7e56da] hover:shadow-lg">
              <div class="w-full h-full flex justify-center items-center">

                <!-- 文件预览 -->
                <div class="h-full w-[10%] overflow-hidden rounded-lg">
                  <!-- 如果是图片文件，则显示压缩后的图片 -->
                  <img v-if="compressedImages[index].url" :id="i.uuid" :src="compressedImages[index].url" :alt="i.name">
                  <!-- 如果不是图片文件，则显示文件后缀名 -->
                  <div v-else
                    class="flex justify-center items-center bg-reed-300 w-full h-full flex-col text-2xl text-white bg-[#7e56da90]">
                    <span>{{ i.name.toString().split(".")[i.name.toString().split(".").length - 1] }}</span>
                    <span>文件</span>
                  </div>
                </div>

                <!-- 文件名，包括后缀名 -->
                <div
                  class="h-full w-[90%] flex justify-start items-center p-4 text-2xl text-black transition-all duration-100 hover:cursor-pointer group-hover:text-[#7e56da]">
                  {{ i.name }}
                </div>

                <!-- 文件控制 -->
                <div
                  class="w-[20%] h-full right-0 absolute translate-x-[100%] space-x-4 flex justify-center items-center transition-all duration-300 group-hover:translate-x-[0%]">
                  <!-- 放大预览，仅支持图片文件 -->
                  <component v-if="compressedImages[index].url" :is="Zoom"
                    class="w-[30px] transition-all duration-300 hover:cursor-pointer hover:w-[40px]" :fill="zoomColor"
                    @click="zoomInImg(index)" @mouseenter="zoomColor = '#409efe'" @mouseleave="zoomColor = '#7e56da'">
                  </component>

                  <!-- 删除 -->
                  <component :is="Delete" class="w-[30px] transition-all duration-300 hover:cursor-pointer hover:w-[40px]"
                    :fill="deleteColor" @click="deleteRenderedFile(index)" @mouseenter="deleteColor = '#f56c6c'"
                    @mouseleave="deleteColor = '#7e56da'">
                  </component>
                </div>
              </div>
            </div>
          </TransitionGroup>

          <!-- file selected item -->
          <div
            class="w-full h-[100px] flex justify-center items-center p-2 my-2 border-[#7e56da] border-[2px] opacity-30 cursor-pointer rounded-xl transition-all duration-300 hover:shadow-[#7e56da] hover:shadow-lg hover:opacity-100"
            @click="() => { fileInputRef?.click() }">
            <component :is="Plus" class="w-[50px]" fill="#7e56da"></component>

            <input type="file" ref="fileInputRef" style="display: none;" multiple @input="getFiles">
          </div>
        </div>
      </el-scrollbar>
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
import { ref, Ref, computed, ComputedRef, nextTick, defineAsyncComponent } from "vue"
import gennerateUUID from "@/utils/generateUUID"
import uploadAppendix from "@/api/Topic/UploadAppendix"
import compressImage from "@/utils/compressImage"
//@ts-ignore
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

const Plus = defineAsyncComponent(() => import("@/assets/icons/IconPlus.vue"))
const Zoom = defineAsyncComponent(() => import("@/assets/icons/IconZoomIn.vue"))
const Delete = defineAsyncComponent(() => import("@/assets/icons/IconDelete.vue"))

interface renderedFileType extends File {
  uuid?: string,
  uploadSccussed?: boolean
}

const fileInputRef: Ref<HTMLElement | undefined> = ref();
const renderedFiles: Ref<renderedFileType[]> = ref([])
const uploadFileStatus = ref([])
const showDrawer: Ref<boolean> = ref(true)
const sentence: ComputedRef<"X" | "Attachment"> = computed(() => {
  if (showDrawer.value) {
    return "X"
  }
  else {
    return "Attachment"
  }
})
const zoomColor: Ref<string> = ref("#7e56da")
const deleteColor: Ref<string> = ref("#7e56da")
const compressedImages: Ref<{ file?: File; url?: string; }[]> = ref([]) // 保存压缩后用于展示的图片，如果不是图片文件，则保存为空对象

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


async function upload(file: File): Promise<boolean> {
  const formData = new FormData()
  formData.append("topicAppendix", file, encodeURIComponent(file.name))

  const result = await uploadAppendix(formData)

  if (result) {
    console.log("appendix upload OK");
    return true
  }
  else {
    console.warn("appendix upload error")
    return false
  }
}

/**
 * 获取选中的文件
 * 并将图片文件压缩后存入compressedImages
 * 若不是图片文件，则存入空对象
 */
async function getFiles(): Promise<void> {
  const files: FileList | null = (fileInputRef.value! as HTMLInputElement).files

  if (!files) return

  for (let i = 0; i < files.length; i++) {
    const file: File = files[i];

    try {
      // 如果是图片文件，则可以被压缩
      // 并加压缩后的图片加入compressedImages
      const compressedFile: File = await compressImage(files[i], 100, 100);
      const compressedImageUrl: string = URL.createObjectURL(compressedFile);
      const compressedImage = {
        file: compressedFile,
        url: compressedImageUrl,
      };
      compressedImages.value.push(compressedImage)
    } catch (error) {
      // 无法被压缩的则不是图片文件
      // compressedImages加入空对象
      compressedImages.value.push({})
    }

    // put file into list for showing
    const _file: renderedFileType = file
    _file.uuid = gennerateUUID()
    renderedFiles.value.push(file)

    // upload file
    // change style by upload result
    const uploadResult = await upload(file)
    console.log(uploadResult);

    if (uploadResult) {
      // uplaod successed

    }
    else {
      // upload filed

    }



  }

  //@ts-ignore
  fileInputRef.value.value = null // 清空fileInput，以便重复选择同样的文件
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

/**
 * 显示图片预览
 * @param imgIndex 需要显示的图片的index
 */
async function zoomInImg(imgIndex: number): Promise<void> {
  showTransform.value = true
  playingAnimation.value = true

  originalImgRef.value = document.getElementById(renderedFiles.value[imgIndex].uuid as string) as HTMLImageElement
  const rect: DOMRect = originalImgRef.value.getBoundingClientRect();

  const { width, height, top, left } = rect as {
    width: number, height: number, top: number, left: number
  }

  previewImgStates.value.startWidth = width
  previewImgStates.value.startTop = top
  previewImgStates.value.startLeft = left

  await nextTick()

  previewImgRef.value!.style.width = width.toString() + "px"
  previewImgRef.value!.style.top = (top + 8).toString() + "px"
  // 因为原本的样式设定中，hover后会向上translate 8px，所有这里需要 +8px，以免动画衔接不够顺滑
  previewImgRef.value!.style.left = left.toString() + "px"

  let file: File = renderedFiles.value[imgIndex]

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
    playingAnimation.value = false
  }, 800);
}

/**
 * 从RenderedFiles中删除选中项
 * @param index 所选中项的index
 */
function deleteRenderedFile(index: number) {
  renderedFiles.value.splice(index, 1)
  compressedImages.value.splice(index, 1)
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

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


.rendered-files-move,
.rendered-files-enter-active,
.rendered-files-leave-active {
  transition: all 0.3s ease;
}

.rendered-files-enter-from,
.rendered-files-leave-to {
  opacity: 0;
  padding: 0px;
  margin: 0px;
  border: 0px;
  height: 0px;
  transform: translateX(-100%);
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