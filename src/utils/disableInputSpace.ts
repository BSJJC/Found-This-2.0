/**
 * @param str the character that needs to be checked for spaces
 */
function disableInputSpace(str: string): string {
  // Can not have consecutive spaces, and cannot start with a space
  if (str.includes("  ") || str.startsWith(" ")) {
    str = str.slice(0, str.length - 1)
  }

  return str;
}

export default disableInputSpace;
