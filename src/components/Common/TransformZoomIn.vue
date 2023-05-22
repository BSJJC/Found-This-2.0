<template>
  <Teleport to="body">
    <div class="flex justify-center items-center bg-gray-300 opacity-70 absolute top-0 left-0 text-white"
      :style="{ top: `${props.states.startTop}px`, left: `${props.states.startLeft}px`, width: `${props.states.startWidth}px`, height: `${props.states.startHeight}px` }"
      @click.self="hide">
      <slot></slot>
    </div>
  </Teleport>
</template>
  
<script setup lang='ts'>
import { onMounted, ref, Ref } from "vue"

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
const divRef: Ref = ref();

function hide(): void {
  emits('hide');
};

onMounted(() => {
  divRef.value = document.getElementById(props.randomID!)


  setTimeout(() => {
    divRef.value.style.width = props.states.endWidth
    divRef.value.style.height = props.states.endHeight
  }, 1000);
})
</script>
  