<template>
  <Teleport to="body">
    <div ref="containerRef" class="w-screen h-screen flex justify-center items-center absolute top-0 left-0">
      <slot></slot>
    </div>

    <!-- dark background -->
    <Transition>
      <div v-show="showDarkBackground"
        class=" flex justify-center items-center w-screen h-screen bg-gray-500 opacity-70 absolute top-0 left-0 text-white z-5"
        @click.self="hide">
      </div>
    </Transition>
  </Teleport>
</template>
  
<script setup lang='ts'>
import { ref, Ref, onMounted } from "vue"

interface States {
  startWidth: number;
  startHeight: number;
  startTop: number;
  startLeft: number;

  endWidth: number;
  endHeight: number;
}

interface Config {
  randomID: string;
  states: States;
  detailChanges?: Array<{
    prop: string;
    targetVal: string;
  }>
}

const props = defineProps<Config>()
const emits = defineEmits(['hide']);

const divRef: Ref<HTMLElement | undefined | null> = ref();
const containerRef: Ref<HTMLElement | undefined> = ref();
const showDarkBackground: Ref<boolean> = ref(false)
const detailChanges: { prop: string; targetVal: string; }[] = props.detailChanges || []; //细节变化可以没有，在获取不到细节变化的时候，变为空数组

/**
 * 在完成挂载后
 * 遍历传入的所有细节变化，并应用
 */
function activeDetailChanges(): void {
  detailChanges.forEach(change => {
    (divRef.value!.style as any)[change.prop] = change.targetVal
  });
}

/**
 * 遍历所有修改过的细节变化
 * 并还原
 * #因为这里将其清空后，原本的样式会自动覆盖，所以无需手动指定#
 */
function resetDetailChanges(): void {
  detailChanges.forEach(change => {
    (divRef.value!.style as any)[change.prop] = ""
  });
}

/**
 * 将divRef归位
 * 并在完成后调用父组件传入的隐藏方法
 */
function hide(): void {
  divRef.value!.style.width = `${props.states.startWidth}px`
  divRef.value!.style.height = `${props.states.startHeight}px`
  divRef.value!.style.top = `${props.states.startTop}px`
  divRef.value!.style.left = `${props.states.startLeft}px`

  showDarkBackground.value = false

  resetDetailChanges();

  setTimeout(() => {
    emits('hide');
  }, 600);
};

/**
 * 在完成挂载后，设置初始定位、宽高
 * 并在完成后设置目标定位、宽高
 * 展示darkBackground
 */
onMounted(() => {
  divRef.value = document.getElementById(props.randomID!)

  divRef.value!.style.position = "absolute"
  divRef.value!.style.zIndex = "10"

  divRef.value!.style.width = `${props.states.startWidth}px`
  divRef.value!.style.height = `${props.states.startHeight}px`
  divRef.value!.style.top = `${props.states.startTop}px`
  divRef.value!.style.left = `${props.states.startLeft}px`

  showDarkBackground.value = true

  setTimeout(() => {
    const rect: DOMRect = containerRef.value!.getBoundingClientRect();

    /**
     * 根据父元素，也就是铺满整个屏幕的背景
     * 和divRef本身的width
     * 计算出可以将divRef水平垂直居中的top和left
     */
    const top: number = (rect.height / 2) - (rect.height * props.states.endHeight * 0.01 / 2)
    const left: number = (rect.width / 2) - (rect.width * props.states.endWidth * 0.01 / 2)

    divRef.value!.style.top = `${top}px`
    divRef.value!.style.left = `${left}px`

    divRef.value!.style.width = `${props.states.endWidth}vw`
    divRef.value!.style.height = `${props.states.endHeight}vh`

    activeDetailChanges()
  }, 0);
})
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>