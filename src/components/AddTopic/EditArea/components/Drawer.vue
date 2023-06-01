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

    <h1 class="text-3xl">Upload Attachment</h1>

    <!-- switch button -->
    <div
      class="absolute flex flex-col justify-center items-center bg-[#7e56da]  rounded-r-lg text-xl text-white cursor-pointer overflow-hidden transition-all duration-500 left-full p-4 hover:pl-[40px] top-[30%]"
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
import { ref, Ref, watch } from "vue"

const showDrawer: Ref<boolean> = ref(false)
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