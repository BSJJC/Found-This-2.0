<template>
  <div class="video-background">
    <video ref="videoRef" autoplay loop muted>
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

<style scoped>
.video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.5;
}

.video-background video {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
