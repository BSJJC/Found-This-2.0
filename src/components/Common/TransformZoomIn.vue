<template>
  <Teleport to="body">
    <div ref="containerRef" class="w-screen h-screen flex justify-center items-center absolute top-0 left-0">
      <Transition>
        <template v-if="!showTargetRef">
          <slot name="origin"></slot>
        </template>
      </Transition>

      <Transition>
        <template v-if="showTargetRef">
          <slot name="target"></slot>
        </template>
      </Transition>
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
  randomIDs: Array<string>;
  states: States;
  detailChanges?: Array<{
    prop: string;
    targetVal: string;
  }>
}

const props = defineProps<Config>()
const emits = defineEmits(['hide']);
const { startWidth, startHeight, startTop, startLeft, endWidth, endHeight } = props.states

const originRef: Ref<HTMLElement | undefined | null> = ref();
const targetRef: Ref<HTMLElement | undefined | null> = ref()
const containerRef: Ref<HTMLElement | undefined> = ref();

const showDarkBackground: Ref<boolean> = ref(false)
const showTargetRef: Ref<boolean> = ref(false)
const animationOver: Ref<boolean> = ref(false)
const detailChanges: { prop: string; targetVal: string; }[] = props.detailChanges || []; //细节变化可以没有，在获取不到细节变化的时候，变为空数组

/**
 * 将originRef赋值为初始状态
 */
function assignInitialValue(): void {
  originRef.value = document.getElementById(props.randomIDs[0]!)

  originRef.value!.style.position = "absolute"
  originRef.value!.style.width = `${startWidth}px`
  originRef.value!.style.height = `${startHeight}px`
  originRef.value!.style.top = `${startTop}px`
  originRef.value!.style.left = `${startLeft}px`
}

/**
 * 根据父元素，也就是铺满整个屏幕的背景
 * 和originRef本身的width
 * 计算出可以将originRef水平垂直居中的top和left
 */
function assignTargetValue(): void {
  originRef.value = document.getElementById(props.randomIDs[0]!)

  const rect: DOMRect = containerRef.value!.getBoundingClientRect();
  const top: number = (rect.height / 2) - (rect.height * endHeight * 0.01 / 2)
  const left: number = (rect.width / 2) - (rect.width * endWidth * 0.01 / 2)

  originRef.value!.style.top = `${top}px`
  originRef.value!.style.left = `${left}px`
  originRef.value!.style.width = `${endWidth}vw`
  originRef.value!.style.height = `${endHeight}vh`

  activeDetailChanges();
}

/**
 * 在完成挂载后
 * 遍历传入的所有细节变化，并应用
 */
function activeDetailChanges(): void {
  detailChanges.forEach(change => {
    (originRef.value!.style as any)[change.prop] = change.targetVal
  });
}

/**
 * 遍历所有修改过的细节变化
 * 并还原
 * #因为这里将其清空后，原本的样式会自动覆盖，所以无需手动指定#
 */
function resetDetailChanges(): void {
  detailChanges.forEach(change => {
    (originRef.value!.style as any)[change.prop] = ""
  });
}

/**
 * 将originRef归位
 * 并在完成后调用父组件传入的隐藏方法
 */
function hide(): void {
  if (!animationOver.value) return
  animationOver.value = false
  showTargetRef.value = false

  setTimeout(() => {
    assignTargetValue()
  }, 0);

  setTimeout(() => {
    assignInitialValue();
  }, 600);

  setTimeout(() => {
    resetDetailChanges();
    showDarkBackground.value = false
  }, 600);

  setTimeout(() => {
    emits('hide');
  }, 1300);
};

/**
 * 在完成挂载后，设置初始定位、宽高
 * 并在完成后设置目标定位、宽高
 * 展示darkBackground
 */
onMounted(() => {
  assignInitialValue();
  showDarkBackground.value = true

  setTimeout(() => {
    assignTargetValue();
    activeDetailChanges()
  }, 0);

  setTimeout(() => {
    showTargetRef.value = true
    targetRef.value = document.getElementById(props.randomIDs[1])
    animationOver.value = true
  }, 600);
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