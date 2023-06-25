<template>
  <el-scrollbar height="100%" class="w-full">
    <div class="w-full h-[90%] flex justify-start items-center flex-wrap py-5 pr-4">
      <!-- file item -->
      <TransitionGroup name="file-item">
        <div v-for="(i, index) in fileList" :key="fileList[index].uuid"
          class="w-full h-[100px] flex justify-center items-center p-2 my-2 border-[2px] rounded-xl overflow-hidden transition-all duration-300 group hover:-translate-y-2 hover:border-[#7e56da] hover:shadow-[#7e56da] hover:shadow-lg">
          <div class="w-full h-full flex justify-center items-center relative">

            <!-- file preview -->
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

            <!-- file name -->
            <div
              class="h-full w-[90%] flex justify-start items-center p-4 text-2xl text-black transition-all duration-100 hover:cursor-pointer group-hover:text-[#7e56da]">
              {{ i.name }}
            </div>

            <!-- file control -->
            <div
              class="w-[20%] h-full right-0 absolute translate-x-[100%] space-x-4 flex justify-center items-center transition-all duration-300 group-hover:translate-x-[0%]">
              <Zoom v-if="compressedImages[index].url"
                class="w-[30px] transition-all duration-300 hover:cursor-pointer hover:w-[35px]" :fill="zoomColor"
                @click="showPreview(i.uuid as string, index as number)" @mouseenter="zoomColor = '#409efe'"
                @mouseleave="zoomColor = '#7e56da'">
              </Zoom>

              <Delete class="w-[30px] transition-all duration-300 hover:cursor-pointer hover:w-[35px]" :fill="deleteColor"
                @click="deleteFile(index)" @mouseenter="deleteColor = '#f56c6c'" @mouseleave="deleteColor = '#7e56da'">
              </Delete>
            </div>

            <!-- upload state -->
            <div class="w-[30px] absolute top-0 right-0">
              <UploadState></UploadState>
            </div>

          </div>
        </div>
      </TransitionGroup>

      <!-- file selected item -->
      <div
        class="w-full h-[100px] flex justify-center items-center p-2 my-2 border-[#7e56da] border-[2px] opacity-30 cursor-pointer rounded-xl transition-all duration-300 hover:shadow-[#7e56da] hover:shadow-lg hover:opacity-100"
        @click="() => { fileInputRef?.click() }">
        <Plus class="w-[50px]" fill="#7e56da"></Plus>

        <input type="file" ref="fileInputRef" style="display: none;" multiple @input="getFiles">
      </div>
    </div>
  </el-scrollbar>

  <!-- img preview -->
  <Preview v-if="ifShowPreview" :uuid="previewUUID" :index="previewIndex" :file-list="fileList"
    :compress-images="compressedImages" @destroyPreview="destroyPreview"></Preview>
</template>
  
<script setup lang='ts'>
import { ref, Ref, defineAsyncComponent, nextTick } from "vue"

import uploadFile from "@/api/Topic/UploadFile"
import gennerateUUID from "@/utils/generateUUID"
import compressImage from "@/utils/compressImage"

import { uploadStates, fileItemType, compressedImagesType } from './Types/index.ts'

const Preview = defineAsyncComponent(() => import("./FileItemComponents/Preview.vue"))
const UploadState = defineAsyncComponent(() => import("./FileItemComponents/UploadState.vue"))

const Plus = defineAsyncComponent(() => import("@/assets/icons/IconPlus.vue"))
const Zoom = defineAsyncComponent(() => import("@/assets/icons/IconZoomIn.vue"))
const Delete = defineAsyncComponent(() => import("@/assets/icons/IconDelete.vue"))

const fileInputRef: Ref<HTMLElement | undefined> = ref();
const fileList: Ref<fileItemType[]> = ref([]) // 保存所有选择了的文件
const compressedImages: Ref<compressedImagesType[]> = ref([]) // 保存压缩后用于展示的图片，如果不是图片文件，则保存为空对象

const zoomColor: Ref<string> = ref("#7e56da")
const deleteColor: Ref<string> = ref("#7e56da")

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

    upload(file)
  }

  //@ts-ignore
  fileInputRef.value.value = null // 清空fileInput，以便重复选择同样的文件
}

async function upload(file: File): Promise<void> {
  const _file = (file as fileItemType)
  _file.uuid = gennerateUUID()
  _file.uploadState = uploadStates.pendding
  const index = fileList.value.push(_file)

  const formData = new FormData()
  formData.append("topicFile", file, encodeURIComponent(file.name))
  const result = await uploadFile(formData)

  await nextTick()

  if (result) {
    const temp = fileList.value[index - 1]
    temp.uploadState = uploadStates.success;
  }
  else {
    fileList.value[index - 1].uploadState = uploadStates.fail
  }
}

/**
 * 从RenderedFiles中删除选中项
 * @param index 所选中项的index
 */
function deleteFile(index: number): void {
  fileList.value.splice(index, 1)
  compressedImages.value.splice(index, 1)
}

// Preview组件所需的参数
const ifShowPreview = ref(false)
const previewUUID = ref("")
const previewIndex = ref(0)
function showPreview(uuid: string, index: number): void {
  previewUUID.value = uuid;
  previewIndex.value = index
  ifShowPreview.value = true
}
function destroyPreview(): void {
  ifShowPreview.value = false
}
</script>

<style lang="scss" scoped>
.file-item-move,
.file-item-enter-active,
.file-item-leave-active {
  transition: all 0.3s ease;
}

.file-item-enter-from,
.file-item-leave-to {
  opacity: 0;
  padding: 0px;
  margin: 0px;
  border: 0px;
  height: 0px;
  transform: translateX(-100%);
}
</style>