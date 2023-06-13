<template>
  <div class="fixed top-0 left-0 w-full h-full z-[-1] opacity-[75]">
    <video ref="videoRef" autoplay loop muted class=" object-cover w-full h-full">
      <source :src="porps.videoSource" type="video/mp4" />
    </video>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";

const porps = defineProps({
  videoSource: {
    type: String,
    required: true,
  },
});

const videoRef: Ref = ref<HTMLVideoElement | null>();

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.play();
  }
});
</script>