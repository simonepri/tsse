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
 * @public
 * @param  {string|Buffer} a The first string.
 * @param  {string|Buffer} b The second string.
 * @return {boolean} true if equals, false otherwise.
 */

function tsse(sa, sb) {
  let ba = sa instanceof Buffer ? sa : Buffer.from(sa);
  let bb = sb instanceof Buffer ? sb : Buffer.from(sb);

  // If strings are of different length simply compare the longest with its
  // self and then return false.
  let equal;
  if (ba.length === bb.length) {
    equal = 1;
  } else {
    if (ba.length > bb.length) {
      bb = ba;
    } else {
      ba = bb;
    }

    equal = 0;
  }

  if (crypto.timingSafeEqual) {
    equal &= crypto.timingSafeEqual(ba, bb);
  } else {
    equal &= timingSafeEqual(ba, bb);
  }

  return equal === 1;
}

module.exports = tsse;
