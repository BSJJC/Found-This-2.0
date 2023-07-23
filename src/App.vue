<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted } from "vue"

import checkElementVisibility from './utils/checkElementVisibility';
import block from "./utils/block";

const fadeInComponents: Ref<Element[]> = ref([])

onMounted(async () => {
  await block(100)
  const components = document.getElementsByClassName("fade-in-component")
  for (const com of components) {
    fadeInComponents.value.push(com)
  }

  checkElementVisibility(fadeInComponents.value, "component-out", "component-in")
})

window.addEventListener("wheel", () => {
  checkElementVisibility(fadeInComponents.value, "component-out", "component-in")
})
</script>