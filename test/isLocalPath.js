const chai = require('chai');
chai.should();

const solcResolver = require('../src');

describe('isLocalPath', () => {

  it('local path', async () => {
    const path = 'lib.sol';
    let isLocal = solcResolver.isLocalPath(path);
    isLocal.should.be.a('boolean');
    isLocal.should.be.eq(true);
  });

  it('not local path', async () => {
    const path = 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol';
    let isLocal = solcResolver.isLocalPath(path);
    isLocal.should.be.a('boolean');
    isLocal.should.be.eq(false);
  });

});