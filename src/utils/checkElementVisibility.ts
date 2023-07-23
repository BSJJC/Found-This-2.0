/**
 * 检查元素是否已经出现在页面中了
 * 并根据结果修改元素 ClassName
 * @param fadeInComponents 所有 ClassName 中含有 fade-in-component 的元素
 * @param removeClassName 元素消失时的 ClassName
 * @param addClassName 元素进入时的 ClassName。
 */
export default function checkElementVisibility(
  fadeInComponents: Element[],
  removeClassName: string,
  addClassName: string
): void {
  fadeInComponents.forEach(com => {
    console.log(1);

    if (com) {
      const rect = com.getBoundingClientRect();
      const isVisible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

      if (isVisible) {
        com.classList.remove(removeClassName)
        com.classList.add(addClassName)
      }
      else {
        com.classList.remove(addClassName)
        com.classList.add(removeClassName)
      }
    }
  });
}