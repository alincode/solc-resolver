require('../utils/mock')();

const chai = require('chai');
chai.should();

const solcResolver = require('../../src');

describe('https', () => {
  it('found', async () => {
    const path = 'https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol';
    let content = await solcResolver.getImportContent(path);
    content.should.be.a('string');
    content.length.should.be.above(50);
  });

  it('no found', async () => {
    const path = 'https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath2.sol';
    try {
      await solcResolver.getImportContent(path);
    } catch (error) {
      error.should.be.a('error');
      error.message.should.be.eq('Content 404: Not Found\n');
    }
  });
});