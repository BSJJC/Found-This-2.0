/**
 * 检查传入的字符串，保留结尾allowedSpacesLength个字符串
 * @param str 需要被检查的字符串
 * @param allowedSpacesLength 最多允许字符串以多少个空格结尾
 * @returns 按要求修改后的字符串
 */
export default function disableInputSpaceByRule(
  str: string,
  allowedSpacesLength: number
): string {
  if (str.startsWith(" ")) {
    return str = str.slice(0, str.length - 1)
  }

  const spaceCount: number = str.length - str.trimEnd().length
  const excessSpaces: number = Math.max(spaceCount - allowedSpacesLength, 0);
  const regex: RegExp = new RegExp(`\\s{${excessSpaces}}$`);

  return str.replace(regex, "");
}