<script lang="ts" setup>
import { ref, onMounted } from "vue";
import lottie from "lottie-web";

interface config {
  onLine?: string;
  offLine?: object
}

const props = defineProps<config>()
const lottieContainer = ref();

onMounted(() => {
  if (props.offLine) {
    // 优先使用本地文件
    lottie.loadAnimation({
      container: lottieContainer.value!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: props.offLine
    });

    return
  }
  else {
    //没有传入本地文件再使用在线文件
    lottie.loadAnimation({
      container: lottieContainer.value!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: props.onLine
    });

    return
  }
});
</script>

<template>
  <div ref="lottieContainer"></div>
</template>
