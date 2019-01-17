require('../utils/mock')();

const chai = require('chai');
chai.should();

const solcResolver = require('../../src');

describe('github', () => {

  it('found', async () => {
    const path = 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol';
    console.time('second time');
    let content = await solcResolver.getImportContent(path);
    console.timeEnd('second time');
    content.should.be.a('string');
    content.length.should.be.above(50);

    // get source from cache
    console.time('second time');
    await solcResolver.getImportContent(path);
    console.timeEnd('second time');
  });

  it('no found', async () => {
    const path = 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath2.sol';
    try {
      await solcResolver.getImportContent(path);  
    } catch (error) {
      error.should.be.a('error');
      error.message.should.be.eq('Content 404: Not Found\n');
    }
  });

  it('path resolve', async () => {
    const path = 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/examples/SimpleToken.sol';
    let content = await solcResolver.getImportContent(path);
    content.should.to.match(/OpenZeppelin/);
  });

});