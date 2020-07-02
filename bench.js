'use strict';

const crypto = require('crypto');
const present = require('present');

const tsse = require('.');

const se = (a, b) => a === b;

/**
 * @private
 * @param {number} length The length of the random string
 * @returns {string} A random string of the given length
 */
function getRandomString(length) {
  return crypto
    .randomBytes(Math.ceil((3 * length) / 4))
    .toString('base64')
    .slice(0, length);
}

/**
 * Generate another string that has the same prefix and length as another one.
 * @private
 * @param {string} base The base string
 * @param {number} relation A number from 0 (not equal at all) to 1 (equal strings)
 * @returns {string} A string that has the same prefix and length of the one provided
 */
function getSimiliarString(base, relation) {
  const length = Math.round(base.length * relation);
  let r = '';
  let str;
  do {
    str = getRandomString(base.length - length);
  } while (str && str[0] === base[length]);

  for (let i = 0; i < length; i++) {
    r += base[i];
  }

  return r + str;
}

/**
 * Compute a==b n times.
 * @private
 * @param {string} a First string
 * @param {string} b Second string
 * @param {number} n The number of iterations
 * @returns {number} The time per comparison (in ns)
 */
function compare(a, b, n) {
  let n2 = n;
  const now = present();

  while (n2--) {
    se(a, b);
  }

  return ((present() - now) * 1e6) / n;
}

/**
 * Compute a==b n times with a constant algorithm.
 * @private
 * @param {string} a First string
 * @param {string} b Second string
 * @param {number} n The number of iterations
 * @returns {number} The time per comparison (in ns)
 */
function constantCompare(a, b, n) {
  let n2 = n;
  const now = present();

  while (n2--) {
    tsse(a, b);
  }

  return ((present() - now) * 1e6) / n;
}

/**
 * Make a statistical experiment on fn
 * @param {function} fn A function that receives nothing and returns a number
 * @param {number} n Number of probes to takes
 * @returns {{avg: number, median: number}} The stats
 */
function stat(fn, n) {
  const times = [];
  let n2 = n;
  let sum = 0;
  let t;

  while (n2--) {
    t = fn();
    sum += t;
    times.push(t);
  }

  const avg = sum / n;
  times.sort((a, b) => a - b);
  let median = times[Math.floor(times.length / 2)];
  if (times.length % 2 === 0) {
    median = (median + times[times.length / 2 - 1]) / 2;
  }

  return {
    avg,
    median
  };
}

/**
 * Runs the benchmark.
 */
function run() {
  const a = getRandomString(1000);
  let b;
  let t;
  let ct;
  console.log(
    ['% simi', 'avg tsse', 'avg ===', 'md tsse ', 'md ==='].join('\t')
  );
  for (let similarity = 0; similarity <= 100; similarity += 2) {
    b = getSimiliarString(a, similarity / 100);
    t = stat(() => compare(a, b, 1e5), 100);
    ct = stat(() => constantCompare(a, b, 1e3), 100);
    console.log(
      [
        similarity,
        ct.avg.toFixed(3),
        t.avg.toFixed(3),
        ct.median.toFixed(3),
        t.median.toFixed(3)
      ].join('\t')
    );
  }
}

run();
