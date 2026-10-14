// Import the library directly so these tests remain isolated from Express.
const hexToRgb = require('../src/hexToRgb');

// Group unit tests for the hexToRgb conversion function.
describe('hexToRgb', () => {
  // Verify conversion of a standard six-digit color with a prefix.
  test('converts a six-digit hex value with a # prefix', () => {
    expect(hexToRgb('#336699')).toEqual({ r: 51, g: 102, b: 153 });
  });

  // Verify conversion of shorthand notation without a prefix.
  test('converts a three-digit hex value without a prefix', () => {
    expect(hexToRgb('0fa')).toEqual({ r: 0, g: 255, b: 170 });
  });

  // Verify malformed input is rejected with the documented error.
  test('rejects malformed hex values', () => {
    expect(() => hexToRgb('#12xz')).toThrow(
      'Hex value must contain 3 or 6 hexadecimal digits'
    );
  });
});
