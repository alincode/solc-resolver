const ResolverEngine = require('../src/resolverEngine');
let resolverEngine = new ResolverEngine();

const chai = require('chai');
chai.should();

function test(path, type) {
  let resolverType = resolverEngine.getResolverType(path);
  resolverType.should.be.a('string');
  resolverType.should.be.eq(type);
}

describe('getResolverType', () => {

  it('github', async () => {
    let resolve = require('resolve-github');
    resolverEngine.addResolver(resolve);
    const path = 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol';
    test(path, 'github');
  });

  it('http', async () => {
    let resolve = require('resolve-http');
    resolverEngine.addResolver(resolve);
    const path = 'http://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol';
    test(path, 'http');

    const path2 = 'https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol';
    test(path2, 'http');
  });

  it('ipfs', async () => {
    let resolve = require('resolve-ipfs');
    resolverEngine.addResolver(resolve);
    const path = 'ipfs://QmTeW79w7QQ6Npa3b1d5tANreCDxF2iDaAPsDvW6KtLmfB/styles/jquery/jquery.min.js';
    test(path, 'ipfs');
  });

  it('swarm', async () => {
    let resolve = require('resolve-swarm');
    resolverEngine.addResolver(resolve);
    const path = 'bzz:/photoalbum.eth/';
    test(path, 'swarm');
  });

});