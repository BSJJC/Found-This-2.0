<template>
  <div class="text-3xl text-red-300">home page</div>
  <Logo :enable-go-to-home-page="true"></Logo>
  <BgVideo :video-source="a"></BgVideo>
</template>

<script setup lang="ts">
import a from "@/assets/videos/default-bg-dark.mp4";

import BgVideo from "@/components/Effects/BgVideo.vue";

import Logo from "@/components/Common/Logo.vue";
</script>

<style></style>
