<template>
  <svg
    :style="{
      fill: `${props.fill}`,
      color: `${props.color}`,
    }"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M16,32A16,16,0,0,0,32,16,16,16,0,0,0,4.69,4.69a16,16,0,0,0,0,22.62A15.86,15.86,0,0,0,16,32ZM6.1,6.1a14,14,0,0,1,19.8,0h0a14,14,0,1,1-19.8,0Z"
      ></path>
      <path
        d="M16,25.18a9.15,9.15,0,0,0,6.49-2.69,1,1,0,0,0-1.41-1.41,7.18,7.18,0,1,1,0-10.16,1,1,0,0,0,1.41-1.41,9.17,9.17,0,0,0-13,0A9.18,9.18,0,0,0,16,25.18Z"
      ></path>
    </g>
  </svg>
</template>

<script setup lang="ts">
interface config {
  fill?: string;
  color?: string;
}

const props = defineProps<config>();
</script>
