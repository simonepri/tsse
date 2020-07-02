const test = require('ava');
const m = require('.');

test.serial('should return true for identical strings', t => {
  const hash = '0a4d55a8d778e5022fab701977c5d840bbc486d0';
  const givenHash = '0a4d55a8d778e5022fab701977c5d840bbc486d0';

  t.is(m(hash, givenHash), true);
});

test.serial('should return true for identical buffers', t => {
  const hash = Buffer.from('0a4d55a8d778e5022fab701977c5d840bbc486d0');
  const givenHash = Buffer.from('0a4d55a8d778e5022fab701977c5d840bbc486d0');

  t.is(m(hash, givenHash), true);
});

test.serial('should return false for non-identical strings', t => {
  const hash = '0a4d55a8d778e5022fab701977c5d840bbc486d0';
  const givenHash = '1265a5eb08997ced279d3854629cba68a378b528';

  t.is(m(hash, givenHash), false);
});

test.serial('should return false for non-identical buffers', t => {
  const hash = Buffer.from('0a4d55a8d778e5022fab701977c5d840bbc486d0');
  const givenHash = Buffer.from('1265a5eb08997ced279d3854629cba68a378b528');

  t.is(m(hash, givenHash), false);
});

test.serial('should return false for strings with differents length', t => {
  const hash = 'c04888dcb0aeb3a9fb64735c366d3fcba247df66';
  const givenHash = '393eb74047bb90c8d80dea54218430ee';

  t.is(m(hash, givenHash), false);
  t.is(m(givenHash, hash), false);
});

test.serial('should return false for buffers with differents length', t => {
  const hash = Buffer.from('c04888dcb0aeb3a9fb64735c366d3fcba247df66');
  const givenHash = Buffer.from('393eb74047bb90c8d80dea54218430ee');

  t.is(m(hash, givenHash), false);
  t.is(m(givenHash, hash), false);
});
