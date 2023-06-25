<template>
  <!-- black background -->
  <Transition>
    <div v-show="showDrawer" class="fixed top-0 bg-[#00000080] w-screen h-screen  transition-all duration-500 z-[100]"
      @click="show"></div>
  </Transition>

  <!-- drawer body -->
  <div
    class=" fixed top-0 left-0 w-1/2 h-screen flex justify-start items-start p-10 bg-white shadow-[#7e56da] shadow-2xl z-[100] transition-all duration-500"
    :style="{ left: `${showDrawer ? '' : '-50%'}` }">

    <div class="w-full h-full flex justify-center items-center flex-col">
      <!-- title -->
      <Title></Title>

      <!-- 显示所有选择的文件 -->
      <FileItem></FileItem>
    </div>

    <!-- 切换显示drawer -->
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

const Title = defineAsyncComponent(() => import("./DrawerComponents/Title.vue"))
const FileItem = defineAsyncComponent(() => import("./DrawerComponents/FileItem.vue"))

const showDrawer: Ref<boolean> = ref(true)
const sentence: ComputedRef<"X" | "Attachment"> = computed(() => {
  if (showDrawer.value) {
    return "X"
  }
  else {
    return "Attachment"
  }
})

/**
 * 展示drawer
 */
function show(): void {
  showDrawer.value = !showDrawer.value
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
</style>