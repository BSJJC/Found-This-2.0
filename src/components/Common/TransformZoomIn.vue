<template>
  <Teleport to="body">
    <div ref="containerRef" class="w-screen h-screen flex justify-center items-center absolute top-0 left-0">
      <slot></slot>
    </div>

    <!-- dark background -->
    <Transition>
      <div v-show="showDarkBackground"
        class=" flex justify-center items-center w-screen h-screen bg-gray-500 opacity-70 absolute top-0 left-0 text-white z-5"
        @click.self="hide">
      </div>
    </Transition>
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
const showDarkBackground = ref(false)



/**
 * 将divRef归位
 * 并在完成后调用父组件传入的隐藏方法
 */
function hide(): void {
  divRef.value!.style.width = `${props.states.startWidth}px`
  divRef.value!.style.height = `${props.states.startHeight}px`
  divRef.value!.style.top = `${props.states.startTop}px`
  divRef.value!.style.left = `${props.states.startLeft}px`

  showDarkBackground.value = false

  setTimeout(() => {
    emits('hide');
  }, 600);
};

/**
 * 在完成挂载后，设置初始定位、宽高
 * 并在完成后设置目标定位、宽高
 * 展示darkBackground
 */
onMounted(() => {
  divRef.value = document.getElementById(props.randomID!)

  divRef.value!.style.position = "absolute"
  divRef.value!.style.zIndex = "10"

  divRef.value!.style.width = `${props.states.startWidth}px`
  divRef.value!.style.height = `${props.states.startHeight}px`
  divRef.value!.style.top = `${props.states.startTop}px`
  divRef.value!.style.left = `${props.states.startLeft}px`

  showDarkBackground.value = true

  setTimeout(() => {
    const rect: DOMRect = containerRef.value!.getBoundingClientRect();

    const top: number = (rect.height / 2) - (rect.height * props.states.endHeight * 0.01 / 2)
    const left: number = (rect.width / 2) - (rect.width * props.states.endWidth * 0.01 / 2)

    divRef.value!.style.top = `${top}px`
    divRef.value!.style.left = `${left}px`

    divRef.value!.style.width = `${props.states.endWidth}vw`
    divRef.value!.style.height = `${props.states.endHeight}vh`
  }, 0);
})
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>