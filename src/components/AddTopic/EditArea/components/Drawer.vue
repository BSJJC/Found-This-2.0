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
            <div v-for="(i, index) in renderedFiles" :key="index"
              class="w-full h-[100px] flex justify-center items-center p-2 my-2 border-[2px] rounded-xl overflow-hidden transition-all duration-300 group hover:-translate-y-2 hover:border-[#7e56da] hover:shadow-[#7e56da] hover:shadow-lg">
              <div class="w-full h-full flex justify-center items-center">

                <!-- file preview, if it can be -->
                <div class="h-full w-[10%]">
                  <img src="http://localhost:5000/api/topic/bg/download/645589c244675dbcf239c359" alt="img preview"
                    class="h-full rounded-lg">
                </div>

                <!-- file name, with extension -->
                <div
                  class="h-full w-[90%] flex justify-start items-center p-4 text-2xl text-black transition-all duration-100 hover:cursor-pointer group-hover:text-[#7e56da]">
                  {{ i.name }}
                </div>

                <div
                  class="w-[20%] h-full right-0 absolute translate-x-[100%] space-x-4 flex justify-center items-center transition-all duration-300 group-hover:translate-x-[0%]">
                  <component :is="Zoom" class="w-[30px] hover:cursor-pointer"></component>
                  <component :is="Delete" class="w-[30px] hover:cursor-pointer" @click="deleteRenderedFile(index)">
                  </component>
                </div>
              </div>
            </div>
          </TransitionGroup>

          <!-- file selected item -->
          <div
            class="w-full h-[100px] flex justify-center items-center p-2 my-2 border-[#7e56da] border-[2px] opacity-30 cursor-pointer rounded-xl transition-all duration-300 hover:shadow-[#7e56da] hover:shadow-lg hover:opacity-100"
            @click="() => { fileInput?.click() }">
            <component :is="Plus" class="w-[50px]" fill="#7e56da"></component>

            <input type="file" ref="fileInput" style="display: none;" multiple @input="getFile">
          </div>

        </div>
      </el-scrollbar>

    </div>


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
import { ref, Ref, watch, defineAsyncComponent } from "vue"

const Plus = defineAsyncComponent(() => import("@/assets/icons/IconPlus.vue"))
const Zoom = defineAsyncComponent(() => import("@/assets/icons/IconZoomIn.vue"))
const Delete = defineAsyncComponent(() => import("@/assets/icons/IconDelete.vue"))

const fileInput: Ref<HTMLElement | undefined> = ref();
const renderedFiles: Ref<File[]> = ref([])
const showDrawer: Ref<boolean> = ref(true)
const sentence: Ref<string> = ref("Attachment")

function show(): void {
  showDrawer.value = !showDrawer.value
}

function getFile(): void {
  const files: FileList | null = (fileInput.value! as HTMLInputElement).files

  if (!files) return

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    renderedFiles.value.push(file)
  }

  //@ts-ignore
  fileInput.value.value = null
}

function deleteRenderedFile(index: number) {
  renderedFiles.value.splice(index, 1)
}

watch(
  () => showDrawer.value,
  () => {
    sentence.value === "Attachment"
      ? sentence.value = "X"
      : sentence.value = "Attachment"
  }
)
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