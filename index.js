'use strict';

const crypto = require('crypto');
const Buffer = require('safe-buffer').Buffer;

/**
 * Buffer constant-time String comparison for buffer of the same length.
 * @param  {buffer} a
 * @param  {buffer} b
 * @return {boolean}
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
 *
 * @param  {string} a The first string.
 * @param  {string} b The second string.
 * @return {boolean} true if equals, false otherwise.
 */

function timingSafeStringEqual(sa, sb) {
  const ba = Buffer.from(sa);
  const bb = Buffer.from(sb);

  let equal = (ba.length === bb.length);

  if (crypto.timingSafeEqual) {
    equal &= crypto.timingSafeEqual(ba, bb);
  } else {
    equal &= timingSafeEqual(ba, bb);
  }
  return equal;
}

module.exports = timingSafeStringEqual;
