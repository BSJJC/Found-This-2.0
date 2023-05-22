<template>
  <Teleport to="body">
    <div class="w-[300px] h-[300px] bg-black absolute top-0 left-0 text-white" @click.self="hide">
    </div>
  </Teleport>
</template>
  
<script setup lang='ts'>
import { defineEmits } from 'vue';

const emits = defineEmits(['hide']);

function hide(): void {
  emits('hide');
};
</script>
  