'use strict';

const crypto = require('crypto');
const present = require('present');
const padStart = require('string.prototype.padstart');

const tsse = require('.');

/**
 * @private
 * @param {number} length The length of the random string
 * @returns {string} A random string of the given length
 */
function getRandomString(length) {
  return crypto
    .randomBytes(Math.ceil(3 * length / 4))
    .toString('base64')
    .slice(0, length);
}

/**
 * Measures the comparison time of fn with a and b as input n times.
 * @private
 * @param {function} fn The function to use for comparison
 * @param {string} a First string
 * @param {string} b Second string
 * @param {number} n The number of iterations
 * @returns {number} The time per comparison (in ns)
 */
function timedCompare(fn, a, b, n) {
  let n2 = n;
  const now = present();

  while (n2--) fn(a, b);

  return (present() - now) * 1e6 / n;
}

/**
 * Make a statistical experiment on fn
 * @param {function} fn A function that receives nothing and returns a number
 * @param {number} n Number of probes to take
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

  return {avg, median};
}

/**
 * Prints a tab separated value table
 * @param {Array.<string>} rows Columns of each row.
 * @param {function} printfn The function to use for printing.
 */
function printTable(rows, padding, delimiter) {
  for (const row of rows) {
    console.log(row.map(c => padStart(c, padding)).join(delimiter));
  }
}

/**
 * Runs the benchmark.
 * @param {function} aGenFn A function that takes the current iteration index
 * and generates the left string for comparison
 * @param {function} bGenFn A function that takes the current iteration index
 * and generates the right string for comparison
 * @param {number} iterations Number of iterations to run.
 * @returns {Array.<{iteration: number, avg: number, median: number}>} The stats
 */
function runBenchmark(aGenFn, bGenFn, iterations) {
  const tsseCmp = tsse;
  const seCmp = (a, b) => a === b;

  const stats = [];
  for (let i = 0; i < iterations; i++) {
    const a = aGenFn(i);
    const b = bGenFn(i);
    stats.push({
      iteration: i,
      se: stat(() => timedCompare(seCmp, a, b, 5000), 250),
      tsse: stat(() => timedCompare(tsseCmp, a, b, 1000), 250),
    });
  }

  return stats;
}

function runPrefixBenchmark() {
  const a = getRandomString(1000);
  const stats = runBenchmark(
    _ => a,
    iteration => {
      const length = Math.round(a.length * (iteration * 5) / 100);
      let randSuffix;
      do randSuffix = getRandomString(a.length - length);
      while (randSuffix && randSuffix[0] === a[length]);
      let commonPrefix = '';
      for (let i = 0; i < length; i++) commonPrefix += a[i];
      return commonPrefix + randSuffix;
    },
    21
  );

  console.log('');
  console.log(' === Common Prefix Comparison Benchmark === ');
  console.log('');
  printTable(
    [
      ['prefix', 'tsse', 'str eq', 'tsse', 'str eq'],
      ['(%)', '(avg ns)', '(avg ns)', '(md ns)', '(md ns)'],
      ['---', '--------', '--------', '-------', '-------'],
    ].concat(
      stats.map(s => [
        (s.iteration * 5).toString(),
        s.tsse.avg.toFixed(3),
        s.se.avg.toFixed(3),
        s.tsse.median.toFixed(3),
        s.se.median.toFixed(3),
      ])
    ),
    8,
    ' | '
  );
}

function runLengthBenchmark() {
  const a = getRandomString(1000);
  const stats = runBenchmark(
    _ => a,
    iteration => {
      const aa = a + a;
      const length = Math.round(a.length * (iteration * 10) / 100);
      let bb = '';
      for (let i = 0; i < length; i++) bb += aa[i];
      return bb;
    },
    21
  );

  console.log('');
  console.log(' === String Length Comparison Benchmark === ');
  console.log('');
  printTable(
    [
      ['length', 'tsse', 'str eq', 'tsse', 'str eq'],
      ['(%)', '(avg ns)', '(avg ns)', '(md ns)', '(md ns)'],
      ['---', '--------', '--------', '-------', '-------'],
    ].concat(
      stats.map(s => [
        (s.iteration * 10).toString(),
        s.tsse.avg.toFixed(3),
        s.se.avg.toFixed(3),
        s.tsse.median.toFixed(3),
        s.se.median.toFixed(3),
      ])
    ),
    8,
    ' | '
  );
}

runPrefixBenchmark();
runLengthBenchmark();
