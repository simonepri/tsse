<h1 align="center">
  <b>tsse</b>
</h1>
<p align="center">
  <!-- Version - npm -->
  <a href="https://www.npmjs.com/package/tsse">
    <img src="https://img.shields.io/npm/v/tsse.svg" alt="Latest version on npm" />
  </a>
  <!-- Downloads - npm -->
  <a href="https://npm-stat.com/charts.html?package=tsse">
    <img src="https://img.shields.io/npm/dt/tsse.svg" alt="Downloads on npm" />
  </a>
  <!-- License - MIT -->
  <a href="https://github.com/simonepri/tsse/tree/master/license">
    <img src="https://img.shields.io/github/license/simonepri/tsse.svg" alt="Project license" />
  </a>

  <br/>

  <!-- Lint -->
  <a href="https://github.com/simonepri/tsse/actions?query=workflow:lint+branch:master">
    <img src="https://github.com/simonepri/tsse/workflows/lint/badge.svg?branch=master" alt="Lint status" />
  </a>
  <!-- Test - macOS -->
  <a href="https://github.com/simonepri/tsse/actions?query=workflow:test-macos+branch:master">
    <img src="https://github.com/simonepri/tsse/workflows/test-macos/badge.svg?branch=master" alt="Test macOS status" />
  </a>
  <!-- Test - Ubuntu -->
  <a href="https://github.com/simonepri/tsse/actions?query=workflow:test-ubuntu+branch:master">
    <img src="https://github.com/simonepri/tsse/workflows/test-ubuntu/badge.svg?branch=master" alt="Test Ubuntu status" />
  </a>
  <!-- Test - Windows -->
  <a href="https://github.com/simonepri/tsse/actions?query=workflow:test-windows+branch:master">
    <img src="https://github.com/simonepri/tsse/workflows/test-windows/badge.svg?branch=master" alt="Test Windows status" />
  </a>

  <br/>

  <!-- Coverage - Codecov -->
  <a href="https://codecov.io/gh/simonepri/tsse">
    <img src="https://img.shields.io/codecov/c/github/simonepri/tsse/master.svg" alt="Codecov Coverage report" />
  </a>
  <!-- DM - Snyk -->
  <a href="https://snyk.io/test/github/simonepri/tsse?targetFile=package.json">
    <img src="https://snyk.io/test/github/simonepri/tsse/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" />
  </a>
  <!-- DM - David -->
  <a href="https://david-dm.org/simonepri/tsse">
    <img src="https://david-dm.org/simonepri/tsse/status.svg" alt="Dependency Status" />
  </a>

  <br/>

  <!-- Code Style - XO-Prettier -->
  <a href="https://github.com/xojs/xo">
    <img src="https://img.shields.io/badge/code_style-XO+Prettier-5ed9c7.svg" alt="XO Code Style used" />
  </a>
  <!-- Test Runner - AVA -->
  <a href="https://github.com/avajs/ava">
    <img src="https://img.shields.io/badge/test_runner-AVA-fb3170.svg" alt="AVA Test Runner used" />
  </a>
  <!-- Test Coverage - Istanbul -->
  <a href="https://github.com/istanbuljs/nyc">
    <img src="https://img.shields.io/badge/test_coverage-NYC-fec606.svg" alt="Istanbul Test Coverage used" />
  </a>
  <!-- Init - ni -->
  <a href="https://github.com/simonepri/ni">
    <img src="https://img.shields.io/badge/initialized_with-ni-e74c3c.svg" alt="NI Scaffolding System used" />
  </a>
  <!-- Release - np -->
  <a href="https://github.com/sindresorhus/np">
    <img src="https://img.shields.io/badge/released_with-np-6c8784.svg" alt="NP Release System used" />
  </a>
</p>
<p align="center">
  ⏱ Constant time string/buffer equals.

  <br/>

  <sub>
    Coded with ❤️ by <a href="#authors">Simone Primarosa</a>.
  </sub>
</p>

## Synopsis
tsse is a string comparison algorithm to prevent Node.js timing attacks.

![tsse benchmark](https://github.com/simonepri/tsse/raw/master/media/tsse-benchmark.png)

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
// => bad hash
```

## API

<a name="tsse"></a>

### tsse(a, b) ⇒ <code>boolean</code>
Does a constant-time String comparison.

**Kind**: global function  
**Returns**: <code>boolean</code> - true if equals, false otherwise.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>string</code> \| <code>Buffer</code> | The first string. |
| b | <code>string</code> \| <code>Buffer</code> | The second string. |

## Contributing
Contributions are REALLY welcome and if you find a security flaw in this code, PLEASE [report it][new issue].

## Authors
- **Simone Primarosa** - *Github* ([@simonepri][github:simonepri]) • *Twitter* ([@simoneprimarosa][twitter:simoneprimarosa])

See also the list of [contributors][contributors] who participated in this project.

## License
This project is licensed under the MIT License - see the [license][license] file for details.


<!-- Links -->
[new issue]: https://github.com/simonepri/tsse/issues/new
[contributors]: https://github.com/simonepri/tsse/contributors

[license]: https://github.com/simonepri/tsse/tree/master/license

[github:simonepri]: https://github.com/simonepri
[twitter:simoneprimarosa]: http://twitter.com/intent/user?screen_name=simoneprimarosa
