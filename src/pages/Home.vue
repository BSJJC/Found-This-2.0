<template>
  <div class="text-3xl text-red-300">
    <NavBar></NavBar>

    <BgVideo :video-source="defaulBgLight"></BgVideo>
  </div>
</template>

<script setup lang="ts">
import defaulBgLight from "@/assets/videos/default-bg-light.mp4";
import BgVideo from "@/components/Effects/BgVideo.vue";
import NavBar from "@/components/Home/Navbar/index.vue";
</script>

<style></style>
