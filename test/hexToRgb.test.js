const hexToRgb = require('../src/hexToRgb');

describe('hexToRgb', () => {
  test('converts a six-digit hex value with a # prefix', () => {
    expect(hexToRgb('#336699')).toEqual({ r: 51, g: 102, b: 153 });
  });

  test('converts a three-digit hex value without a prefix', () => {
    expect(hexToRgb('0fa')).toEqual({ r: 0, g: 255, b: 170 });
  });

  test('rejects malformed hex values', () => {
    expect(() => hexToRgb('#12xz')).toThrow(
      'Hex value must contain 3 or 6 hexadecimal digits'
    );
  });
});
