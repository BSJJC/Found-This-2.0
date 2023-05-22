<template>
  <svg
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    :style="{
      fill: `${props.fill}`,
      color: `${props.color}`,
    }"
  >
    <path
      d="M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64v450.304z"
    ></path>
  </svg>
</template>

<script setup lang="ts">
interface config {
  fill?: string;
  color?: string;
}

const props = defineProps<config>();
</script>
