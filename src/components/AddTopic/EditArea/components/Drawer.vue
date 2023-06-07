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
          <div v-for="(i, index) in 20" :key="index"
            class="w-full h-[100px] flex justify-center items-center p-2 my-2 border-[2px] rounded-xl relative overflow-hidden transition-all duration-300 group hover:-translate-y-2 hover:border-[#7e56da] hover:shadow-[#7e56da] hover:shadow-lg">
            <div class="w-full h-full flex justify-center items-center">

              <!-- file preview, if it can be -->
              <div class="h-full w-[10%]">
                <img src="http://localhost:5000/api/topic/bg/download/645589c244675dbcf239c359" alt="img preview"
                  class="h-full rounded-lg">
              </div>

              <!-- file name, with extension -->
              <div
                class="h-full w-[90%] flex justify-start items-center p-4 text-2xl text-black transition-all duration-100 hover:cursor-pointer group-hover:text-[#7e56da]">
                {{ i }}
              </div>

              <div
                class="w-[20%] h-full right-0 absolute translate-x-[100%] space-x-4 flex justify-center items-center transition-all duration-300 group-hover:translate-x-[0%]">
                <component :is="Zoom" class="w-[40px] hover:cursor-pointer"></component>
                <component :is="Delete" class="w-[40px] hover:cursor-pointer"></component>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>

    </div>


    <!-- switch button -->
    <div
      class="absolute flex flex-col justify-center items-center bg-[#7e56da]  rounded-r-lg text-xl text-white overflow-hidden transition-all duration-500 left-full p-4 hover:pl-[40px] top-[30%]"
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

const Zoom = defineAsyncComponent(() => import("@/assets/icons/IconZoomIn.vue"))
const Delete = defineAsyncComponent(() => import("@/assets/icons/IconDelete.vue"))

const showDrawer: Ref<boolean> = ref(true)
const sentence: Ref<string> = ref("Attachment")

function show(): void {
  showDrawer.value = !showDrawer.value
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
  transition: all .3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>