<template>
  <Teleport to="body">
    <div class="w-[300px] h-[300px] bg-black absolute top-0 left-0 text-white" @click.self="hide">
      <slot></slot>
    </div>
  </Teleport>
</template>
  
<script setup lang='ts'>
import { onMounted, ref, Ref } from "vue"

const props = defineProps({
  randomID: String
})
const emits = defineEmits(['hide']);
const divRef: Ref = ref();

function hide(): void {
  emits('hide');
};

onMounted(() => {
  divRef.value = document.getElementById(props.randomID!)


  setTimeout(() => {
    divRef.value.style.width = "200px"
  }, 1000);
})
</script>
  