<template>
  <!-- msak -->
  <div class="fixed top-0 left-0 w-screen h-screen z-[100] transition-all duration-500"
    :style="{ background: `${showDrawer ? '#00000080' : '00000000'}` }" @click="show"></div>

  <!-- main drawer -->
  <div
    class=" fixed top-0 left-0 w-1/2 h-screen flex justify-center items-center bg-white shadow-[#7e56da] shadow-2xl z-[500] transition-all duration-500"
    :style="{ transform: `${showDrawer ? 'translateX(0px)' : 'translateX(-100%)'}` }">



    <!-- switch button -->
    <div
      class="absolute flex flex-col justify-center items-center bg-[#7e56da]  rounded-r-lg text-xl text-white cursor-pointer overflow-hidden transition-all duration-500 left-full p-4 hover:pl-[40px] top-[30%] z-[200]"
      :style="{ top: `${showDrawer ? '0px' : ''}`, height: `${showDrawer ? '50px' : '300px'}` }" @click="show">

      <TransitionGroup name="word">
        <span v-for="(char, index) in sentence" :key="index">
          {{ char }}
        </span>
      </TransitionGroup>

    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { ref, Ref, watch } from "vue"

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
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
* {
  user-select: none;
  -webkit-user-select: none;
}

.word-enter-active,
.word-leave-active {
  transition: all .3s ease-in-out;
}

.word-enter-from,
.word-leave-to {
  opacity: 0;
}
</style>