<template>
  <div class="w-screen h-screen relative">
    <nav-bar class="h-[10vh] absolute z-[100]"></nav-bar>

    <main-body class="h-[100vh] absolute"></main-body>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue"

import NavBar from "@/components/Home/Navbar/index.vue";
import MainBody from "@/components/Home/MainBody/index.vue"

import getTopicInfo from "@/api/Topic/GetTopicInfo";

async function init(): Promise<void> {
  const data = await getTopicInfo();
  sessionStorage.setItem("topicsInfo", JSON.stringify(data.data))
}

onBeforeMount(() => {
  init();
})
</script>