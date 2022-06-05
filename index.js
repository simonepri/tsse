'use strict';

const crypto = require('crypto');
const Buffer = require('safe-buffer').Buffer;

/**
 * Buffer constant-time String comparison for buffer of the same length.
 * @private
 * @param  {Buffer} a The first string.
 * @param  {Buffer} b The second string.
 * @return {boolean} true if equals, false otherwise.
 */
function timingSafeEqual(a, b) {
  let c = 0;
  const len = a.length;
  for (let i = 0; i < len; i++) {
    c |= a[i] ^ b[i];
  }

  return c === 0;
}

/**
 * Does a constant-time String comparison.
 * NOTE: When `hiddenStr` and `inputStr` have different lengths `hiddenStr` is
 * compared to itself, which makes the comparison non-commutative (time-wise).
 * @public
 * @param  {string|Buffer} hiddenStr A string that you don't want to leak.
 * @param  {string|Buffer} inputStr Another string.
 * @return {boolean} true if equals, false otherwise.
 */

function tsse(hiddenStr, inputStr) {
  let equal = true;
  if (hiddenStr.length !== inputStr.length) {
    // If inputs are of different length we compare `hiddenStr` with itself
    // and then return false.
    inputStr = hiddenStr;
    equal = false;
  }

  const hiddenBuff = Buffer.from(hiddenStr);
  const inputBuff = Buffer.from(inputStr);
  if (crypto.timingSafeEqual) {
    // Node.js v6.6.0 or higher.
    equal &= crypto.timingSafeEqual(hiddenBuff, inputBuff);
  } else {
    equal &= timingSafeEqual(hiddenBuff, inputBuff);
  }

  return equal === 1;
}

module.exports = tsse;
