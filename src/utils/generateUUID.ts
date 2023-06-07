/**
 *  创建 UUID
 * @returns UUID
 */
function generateUUID(): string {
  let uuid: string = "";
  const possibleChars: string = "abcdef0123456789";

  for (let i = 0; i < 32; i++) {
    const randomInt: number = Math.floor(Math.random() * 16);
    const randomChar: string = possibleChars.charAt(randomInt);
    uuid += randomChar;

    if (i === 7 || i === 11 || i === 15 || i === 19) {
      uuid += "-";
    }
  }

  return uuid;
}

export default generateUUID;
