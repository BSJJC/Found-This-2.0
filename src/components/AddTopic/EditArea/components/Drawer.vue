<template>
  <div class="relative w-1/2 h-full flex justify-center items-center bg-red-300 z-[500] transition-all duration-500"
    :style="{ transform: `${showDrawer ? 'translateX(0px)' : 'translateX(-100%)'}` }">

    <div
      class="absolute flex flex-col justify-center items-center bg-[#7e56da]  rounded-r-lg text-xl text-white cursor-pointer overflow-hidden transition-all duration-500 left-full p-4 hover:pl-[40px] top-[30%]"
      :style="{ top: `${showDrawer ? '0px' : ''}`, height: `${showDrawer ? '80px' : '300px'}` }" @click="test">

      <TransitionGroup name="op">
        <span v-for="(char, index) in sentence" :key="index">
          {{ char }}
        </span>
      </TransitionGroup>
    </div>


  </div>
</template>
  
<script setup lang='ts'>
import { ref, Ref } from "vue"

const showDrawer: Ref<boolean> = ref(false)
const sentence: Ref<string> = ref("Attachment")

function test(): void {
  showDrawer.value = !showDrawer.value

  sentence.value === "Attachment"
    ? sentence.value = "X"
    : sentence.value = "Attachment"
}
</script>

<style lang="scss" scoped>
* {
  user-select: none;
  -webkit-user-select: none;
}

.op-enter-active,
.op-leave-active {
  transition: all .3s ease-in-out;
}

.op-enter-from,
.op-leave-to {
  opacity: 0;
}
</style>