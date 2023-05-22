<template>
  <div class="text-3xl text-red-300">home page</div>
  <BgVideo :video-source="a"></BgVideo>
</template>

<script setup lang="ts">
import a from "@/assets/videos/1.mp4";

import BgVideo from "@/components/Effects/BgVideo.vue";
</script>

<style></style>
