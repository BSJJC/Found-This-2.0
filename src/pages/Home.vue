<template>
  <div class="text-3xl text-red-300">
    <NavBar></NavBar>

    <template>123</template>

    <BgVideo :video-source="defaulBgLight" @onhideMiddelTransform="hideMiddelTransform"></BgVideo>
  </div>
</template>

<script setup lang="ts">
import defaulBgLight from "@/assets/videos/default-bg-light.mp4";
import BgVideo from "@/components/Effects/BgVideo.vue";
import NavBar from "@/components/Home/Navbar/index.vue";

function hideMiddelTransform() {
  alert(1)
}
</script>

<style></style>
