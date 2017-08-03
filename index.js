'use strict';

const crypto = require('crypto');
const Buffer = require('safe-buffer').Buffer;

const HMAC_ALGORITHM = 'sha256';
const HMAC_KEY_LENGTH = 32;

/**
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
 * Does a constant-time String comparison using the Brad Hill's Double HMAC
 * pattern.
 *
 * @param  {string} a The first string.
 * @param  {string} b The second string.
 * @return {boolean} true if equals, false otherwise.
 */

function timingSafeStringEqual(sa, sb) {
  const ba = Buffer.from(sa);
  const bb = Buffer.from(sb);

  const key = crypto.randomBytes(HMAC_KEY_LENGTH);
  const ha = new crypto.Hmac(HMAC_ALGORITHM, key).update(ba).digest();
  const hb = new crypto.Hmac(HMAC_ALGORITHM, key).update(bb).digest();

  // The second test, for ba.equals(bb), is just in case of the vanishingly small
  // chance of a collision. It only fires if the digest comparison passes and so
  // doesn't leak timing information.
  if (crypto.timingSafeEqual) {
    return crypto.timingSafeEqual(ha, hb) && ba.equals(bb);
  }
  return timingSafeEqual(ha, hb) && ba.equals(bb);
}

module.exports = timingSafeStringEqual;
