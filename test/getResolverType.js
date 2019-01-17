const chai = require('chai');
chai.should();

function test(path, type) {
  const solcResolver = require('../src');
  let resolverType = solcResolver.getResolverType(path);
  resolverType.should.be.a('string');
  resolverType.should.be.eq(type);
}

describe('getResolverType', () => {

  it('github', async () => {
    const path = 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol';
    test(path, 'github');
  });

  it('http', async () => {
    const path = 'http://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol';
    test(path, 'http');
  });

  it('https', async () => {
    const path = 'https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol';
    test(path, 'https');
  });

  it('ipfs', async () => {
    const path = 'ipfs://QmTeW79w7QQ6Npa3b1d5tANreCDxF2iDaAPsDvW6KtLmfB/styles/jquery/jquery.min.js';
    test(path, 'ipfs');
  });

  it('swarm', async () => {
    const path = 'bzz:/photoalbum.eth/';
    test(path, 'swarm');
  });

});