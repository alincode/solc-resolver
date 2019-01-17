# Solc resolver

![Travis](https://img.shields.io/travis/alincode/solc-resolver.svg)
[![codecov](https://codecov.io/gh/alincode/solc-resolver/branch/master/graph/badge.svg)](https://codecov.io/gh/alincode/solc-resolver)![npm downloads](https://img.shields.io/npm/dt/solc-resolver.svg)
[![Dependency Status](https://img.shields.io/david/alincode/solc-resolver.svg?style=flat)](https://david-dm.org/alincode/solc-resolver)

### Install

```sh
npm install solc-resolver
```

### Usage

* getResolverType

```js
const solcResolver = require('solc-resolver');
const path = 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol';
let resolverType = solcResolver.getResolverType(path);
// github
```

* getImportContent

```js
const path = 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol';
let content = await solcResolver.getImportContent(path);
```

```js
const path = 'http://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol';
let content = await solcResolver.getImportContent(path);
```

```js
const path = 'https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol';
let content = await solcResolver.getImportContent(path);
```

```js
const path = 'ipfs://QmTeW79w7QQ6Npa3b1d5tANreCDxF2iDaAPsDvW6KtLmfB/styles/jquery/jquery.min.js';
let content = await solcResolver.getImportContent(path);
```

```js
const path = 'bzz:/photoalbum.eth/';
let content = await solcResolver.getImportContent(path);
```

## License
MIT © [alincode](https://github.com/alincode/solc-resolver)