<template>
  <div ref="lottieContainer"></div>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted, watch } from "vue";
import lottie, { AnimationItem } from "lottie-web";

interface config {
  onLine?: string;
  offLine?: object
}

const props = defineProps<config>()
const lottieContainer: Ref<HTMLElement | undefined> = ref();
const animationInstance: Ref<AnimationItem | undefined | null> = ref<AnimationItem>()

function load(): void {
  if (props.offLine) {
    // 优先使用本地文件
    animationInstance.value = lottie.loadAnimation({
      container: lottieContainer.value!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: props.offLine
    });
  }
  else {
    //没有传入本地文件再使用在线文件
    animationInstance.value = lottie.loadAnimation({
      container: lottieContainer.value!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: props.onLine
    });
  }
}

// 监听传入的props改变
// 如有改变，删除旧动画，加载新动画
watch(
  () => { props.offLine, props.onLine },
  () => {
    animationInstance.value!.destroy()
    animationInstance.value = null
    load();
  },
  {
    deep: true
  }
)

onMounted(() => {
  load();
});
</script>