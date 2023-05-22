<script lang="ts" setup>
import { ref, onMounted } from "vue";
import lottie from "lottie-web";

const props = defineProps<{
  animationUrl: string;
}>();

const lottieContainer = ref(null);

onMounted(() => {
  lottie.loadAnimation({
    container: lottieContainer.value as unknown as Element,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: props.animationUrl,
  });
});
</script>

<template>
  <div ref="lottieContainer" class="scale-125"></div>
</template>
