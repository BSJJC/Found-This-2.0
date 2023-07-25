/**
 * 主动阻塞代码执行
 * @param time 需要阻塞的时长，单位为ms
 * @returns void
 */
export default async function block(time: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, time));
}