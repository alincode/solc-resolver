const chai = require('chai');
chai.should();

const ResolverEngine = require('../src/resolverEngine');
let resolverEngine = new ResolverEngine();

describe('isMatch', () => {

  it('not match', async () => {
    const path = 'lib.sol';
    let isMatch = resolverEngine.isMatch(path);
    isMatch.should.be.a('boolean');
    isMatch.should.be.eq(false);
  });

  it('match', async () => {
    const path = 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol';
    let resolve = require('resolve-github');
    resolverEngine.addResolver(resolve);
    let isMatch = resolverEngine.isMatch(path);
    isMatch.should.be.a('boolean');
    isMatch.should.be.eq(false);
  });

});