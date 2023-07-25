import type { Ref } from "vue"

/**
 * 随着页面滚动修改dom元素的样式
 * @param domEl 需要被修改的dom元素
 * @param changeVal 被修改的值，接收的是一个Ref类型的值
 * @param interval 被修改的值的最大值，changeVal将在0~interval之间变化
 */
export default function changeWhenWheel(
  domEl: HTMLElement,
  changeVal: Ref<number>,
  interval: number
): void {
  const windowHeight = window.innerHeight;
  const distanceFromTop = domEl.getBoundingClientRect().top;

  const scrollPercentage = 1 + (distanceFromTop / windowHeight)
  changeVal.value = interval * scrollPercentage;
}