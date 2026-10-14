/**
 * Convert a CSS-style hexadecimal color to numeric RGB channels.
 *
 * @param {string} hex A three- or six-digit hex value, optionally prefixed with #.
 * @returns {{r: number, g: number, b: number}} RGB channels in the range 0-255.
 * @throws {TypeError} If hex is not a string or is not a valid color.
 */
function hexToRgb(hex) {
  // Reject non-string values before attempting string operations.
  if (typeof hex !== 'string') {
    throw new TypeError('Hex value must be a string');
  }

  // Remove the optional CSS color prefix and validate the remaining digits.
  const normalized = hex.replace(/^#/, '');
  const isValidLength = normalized.length === 3 || normalized.length === 6;
  const isHex = /^[0-9a-f]+$/i.test(normalized);

  if (!isValidLength || !isHex) {
    throw new TypeError('Hex value must contain 3 or 6 hexadecimal digits');
  }

  // Expand shorthand colors such as "0fa" to "00ffaa".
  const expanded = normalized.length === 3
    ? normalized.split('').map((digit) => digit + digit).join('')
    : normalized;

  // Parse each two-character channel from hexadecimal to decimal.
  return {
    r: parseInt(expanded.slice(0, 2), 16),
    g: parseInt(expanded.slice(2, 4), 16),
    b: parseInt(expanded.slice(4, 6), 16)
  };
}

module.exports = hexToRgb;
