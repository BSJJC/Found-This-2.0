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

      <div class="w-full h-[10%] flex justify-start items-center text-4xl text-[#7e56da]">Upload Attachment</div>

      <el-scrollbar height="100%" class="w-full">
        <div class="w-full h-[90%] flex justify-start items-center flex-wrap py-5 pr-4">
          <!-- rendered files -->
          <TransitionGroup name="rendered-files">
            <div v-for="(i, index) in renderedFiles" :key="renderedFiles[index].uuid"
              class="w-full h-[100px] flex justify-center items-center p-2 my-2 border-[2px] rounded-xl overflow-hidden transition-all duration-300 group hover:-translate-y-2 hover:border-[#7e56da] hover:shadow-[#7e56da] hover:shadow-lg">
              <div class="w-full h-full flex justify-center items-center">

                <!-- 文件预览 -->
                <div class="h-full w-[10%] overflow-hidden rounded-lg">
                  <!-- 如果是图片文件，则显示压缩后的图片 -->
                  <img v-if="compressedImages[index].url" :id="i.uuid" :src="compressedImages[index].url" :alt="i.name">
                  <!-- 如果不是图片文件，则显示文件后缀名 -->
                  <div v-else
                    class="flex justify-center items-center bg-reed-300 w-full h-full flex-col text-2xl text-white rounded-lg bg-[#7e56da90]">
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


    <template v-if="showTransform">
      <Transform @hide="hidedTransform" :randomIDs="randomIDs" :states="states">

        <template #original>
          <img :src="imgPreUrl" :id="randomIDs[0]">
        </template>


        <template #target>
          <img :src="imgPreUrl" :id="randomIDs[1]">
        </template>

      </Transform>
    </template>

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
import gennerateUUID from "@/utils/generateUUID"
import compressImage from "@/utils/compressImage"

import Transform from "@/components/Common/Transform.vue";

const Plus = defineAsyncComponent(() => import("@/assets/icons/IconPlus.vue"))
const Zoom = defineAsyncComponent(() => import("@/assets/icons/IconZoomIn.vue"))
const Delete = defineAsyncComponent(() => import("@/assets/icons/IconDelete.vue"))

interface renderedFileType extends File {
  uuid?: string
}

const fileInputRef: Ref<HTMLElement | undefined> = ref();
const renderedFiles: Ref<renderedFileType[]> = ref([])
const showDrawer: Ref<boolean> = ref(false)
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

const showTransform: Ref<boolean> = ref(false)
const compressedImages: Ref<{ file?: File; url?: string; }[]> = ref([]) // 保存压缩后用于展示的图片，如果不是图片文件，则是空对象
const randomIDs: string[] = [Math.random().toString(), Math.random().toString()]
const states = ref({
  startWidth: 0,
  startHeight: 0,
  startTop: 0,
  startLeft: 0,
  endWidth: 0,
  endHeight: 0
})
const imgPreUrl = ref("")


/**
 * 展示drawer
 */
function show(): void {
  showDrawer.value = !showDrawer.value
}

async function getFiles(): Promise<void> {
  const files: FileList | null = (fileInputRef.value! as HTMLInputElement).files

  if (!files) return

  for (let i = 0; i < files.length; i++) {
    const file: renderedFileType = files[i];

    try {
      // 如果是图片文件，则可以被压缩
      // 并加压缩后的图片加入compressedImages
      const compressedFile = await compressImage(files[i], 200, 200);
      const compressedImageUrl = URL.createObjectURL(compressedFile);
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

    file.uuid = gennerateUUID()
    renderedFiles.value.push(file)
  }

  //@ts-ignore
  fileInputRef.value.value = null // 清空fileInput，以便重复选择同样的文件
}

function hidedTransform(): void {
  showTransform.value = false
}


function zoomInImg(imgIndex: number) {



  const imgRef = document.getElementById(renderedFiles.value[imgIndex].uuid as string)
  const rect: DOMRect = imgRef!.getBoundingClientRect();

  const { width, height, top, left } = rect as {
    width: number, height: number, top: number, left: number
  }

  states.value.startWidth = width
  states.value.startHeight = height
  states.value.startTop = top
  states.value.startLeft = left

  console.log(width);
  console.log(height);
  console.log(top);
  console.log(left);

  imgPreUrl.value = URL.createObjectURL(renderedFiles.value[imgIndex])

  showTransform.value = true
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
</style>