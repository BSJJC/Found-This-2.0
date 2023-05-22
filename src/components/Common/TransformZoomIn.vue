<template>
  <Teleport to="body">
    <div ref="containerRef" class="w-screen h-screen flex justify-center items-center absolute top-0 left-0">
      <slot></slot>
    </div>

    <div id="mask"
      class=" flex justify-center items-center w-screen h-screen bg-gray-500 opacity-0 absolute top-0 left-0 text-white z-5"
      @click.self="hide">
    </div>
  </Teleport>
</template>
  
<script setup lang='ts'>
import { ref, Ref, onMounted } from "vue"

interface states {
  startWidth: number;
  startHeight: number;
  startTop: number;
  startLeft: number;

  endWidth: number;
  endHeight: number;
}

interface config {
  randomID: string;
  states: states
}

const props = defineProps<config>()
const emits = defineEmits(['hide']);

const divRef: Ref<HTMLElement | undefined | null> = ref();
const containerRef: Ref<HTMLElement | undefined> = ref();

function hide(): void {
  emits('hide');
};

onMounted(() => {
  divRef.value = document.getElementById(props.randomID!)

  divRef.value!.style.position = "absolute"
  divRef.value!.style.zIndex = "10"

  divRef.value!.style.width = `${props.states.startWidth}px`
  divRef.value!.style.height = `${props.states.startHeight}px`
  divRef.value!.style.top = `${props.states.startTop}px`
  divRef.value!.style.left = `${props.states.startLeft}px`

  divRef.value!.style.borderRadius = "1rem"

  setTimeout(() => {
    const rect: DOMRect = containerRef.value!.getBoundingClientRect();

    const top: number = (rect.height / 2) - (rect.height * 0.7 / 2)
    const left: number = (rect.width / 2) - (rect.width * 0.8 / 2)

    divRef.value!.style.top = `${top}px`
    divRef.value!.style.left = `${left}px`

    divRef.value!.style.width = `${props.states.endWidth}vw`
    divRef.value!.style.height = `${props.states.endHeight}vh`

    divRef.value!.style.fontSize = `100px`
  }, 0);
})
</script>
  
<style lang="scss" scoped>
* {
  user-select: none;
  -webkit-user-select: none;
}

@keyframes mask-in {
  to {
    opacity: 0.8;
  }
}

#mask {
  animation: mask-in .5s ease-in-out forwards;
}
</style>