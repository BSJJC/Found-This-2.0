<template>
  <div class="w-screen h-screen">
    <nav-bar class="max-h-[10%]"></nav-bar>

    <main-body class="max-h-[90%]"></main-body>

    <BgVideo :video-source="defaulBgLight"></BgVideo>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue"

import NavBar from "@/components/Home/Navbar/index.vue";
import MainBody from "@/components/Home/MainBody/index.vue"
import defaulBgLight from "@/assets/videos/default-bg-light.mp4";
import BgVideo from "@/components/Effects/BgVideo.vue";

import getTopicInfo from "@/api/Topic/GetTopicInfo";

async function init(): Promise<void> {
  const data = await getTopicInfo();
  sessionStorage.setItem("topicsInfo", JSON.stringify(data.data))
}

onBeforeMount(() => {
  init();
})
</script>