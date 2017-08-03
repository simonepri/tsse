'use strict';

const crypto = require('crypto');
const Buffer = require('safe-buffer').Buffer;

/**
 * Implements Brad Hill's Double HMAC pattern from
 * https://www.nccgroup.trust/us/about-us/newsroom-and-events/blog/2011/february/double-hmac-verification/.
 * In short, it's near-impossible to write a reliable constant-time compare in a
 * high level language like JS, because of the many layers that can optimize
 * away attempts at being constant time.

 * Double HMAC avoids that problem by blinding the timing channel instead. After
 * running the inputs through a second round of HMAC, we are free to
 * short-circuit comparison, because the time it takes to reach the
 * short-circuit has no relation to the similarity between the guessed digest
 * and the correct one.
 *
 * @param  {string} a The first buffer.
 * @param  {string} b The second buffer.
 * @return {boolean} true if equals, false otherwise.
 */
function timingSafeEqual(a, b) {
  const key = crypto.randomBytes(32);
  const ah = new crypto.Hmac('sha256', key).update(a).digest();
  const bh = new crypto.Hmac('sha256', key).update(b).digest();

  // The second test, for a.equals(b), is just in case of the vanishingly small
  // chance of a collision. It only fires if the digest comparison passes and so
  // doesn't leak timing information.
  return ah.equals(bh) && a.equals(b);
}

/**
 * Does a constant-time String comparison using crypto native timingSafeEqual
 * if available or the Brad Hill's Double HMAC pattern if not.
 *
 * @param  {string} a The first string.
 * @param  {string} b The second string.
 * @return {boolean} true if equals, false otherwise.
 */
function timingSafeStringEqual(sa, sb) {
  const ba = Buffer.from(sa);
  const bb = Buffer.from(sb);

  if (sa.length !== sb.length) {
    return false;
  }

  if (crypto.timingSafeEqual) {
    return crypto.timingSafeEqual(ba, bb);
  }
  return timingSafeEqual(ba, bb);
}

module.exports = timingSafeStringEqual;
