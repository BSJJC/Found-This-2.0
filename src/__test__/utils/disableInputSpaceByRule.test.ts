import { describe, it, expect } from 'vitest';
import disableInputSpaceByRule from '@/utils/disableInputSpaceByRule';

describe("disableInputSpaceByRule", () => {
  it('should keep 3 spaces', () => {
    const str = 'Hello World     ';
    const allowedSpacesLength = 3;

    const result = disableInputSpaceByRule(str, allowedSpacesLength);

    expect(result).toBe("Hello World   ")
  });

  it(' should remove all spaces if allowedSpacesLength is 0', () => {
    const str = 'Hello World     ';
    const allowedSpacesLength = 0;

    const result = disableInputSpaceByRule(str, allowedSpacesLength);

    expect(result).toBe('Hello World')
  });
})