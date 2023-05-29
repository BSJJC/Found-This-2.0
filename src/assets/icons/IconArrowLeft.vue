<template>
  <svg :style="{
    fill: `${props.fill}`,
    color: `${props.color}`,
  }" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z">
    </path>
  </svg>
</template>

<script setup lang="ts">
interface config {
  fill?: string;
  color?: string;
}

const props = defineProps<config>();
</script>
