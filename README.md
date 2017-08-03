# tsse
[![Travis CI](https://travis-ci.org/simonepri/tsse.svg?branch=master)](https://travis-ci.org/simonepri/tsse) [![Codecov](https://img.shields.io/codecov/c/github/simonepri/tsse/master.svg)](https://codecov.io/gh/simonepri/tsse) [![npm](https://img.shields.io/npm/dm/tsse.svg)](https://www.npmjs.com/package/tsse) [![npm version](https://img.shields.io/npm/v/tsse.svg)](https://www.npmjs.com/package/tsse) [![npm dependencies](https://david-dm.org/simonepri/tsse.svg)](https://david-dm.org/simonepri/tsse) [![npm dev dependencies](https://david-dm.org/simonepri/tsse/dev-status.svg)](https://david-dm.org/simonepri/tsse#info=devDependencies)

> ⏱ Timing safe string equals.

## Install

```
$ npm install --save tsse
```

## Usage

```js
const tsse = require('tsse');

const hash      = '0a4d55a8d778e5022fab701977c5d840bbc486d0';
const givenHash = '1265a5eb08997ced279d3854629cba68a378b528';

if (tsse(hash, givenHash)) {
  console.log('good hash');
} else {
  console.log('bad hash');
}
//=> bad hash
```

## API

### tsse(strA, strB)

Does a constant-time String comparison using crypto native timingSafeEqual if
available or the Brad Hill's Double HMAC pattern if not.

#### strA

Type: `string`

The first string.

#### strB

Type: `string`

The second string.

## Authors
* **Simone Primarosa** - [simonepri](https://github.com/simonepri)

See also the list of [contributors](https://github.com/simonepri/tsse/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
