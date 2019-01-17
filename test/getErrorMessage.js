const chai = require('chai');
chai.use(require('chai-match'));
chai.should();

const solcResolver = require('../src');

describe('getErrorMessage', () => {

  it('case 1', async () => {
    try {
      const path = 'app://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol';
      await solcResolver.getImportContent(path);
    } catch (error) {
      error.should.be.a('error');
      error.message.should.match(/Unable to import/);
    }
  });

  it('case 2', async () => {
    try {
      const path = 'bb:/raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol';
      await solcResolver.getImportContent(path);
    } catch (error) {
      error.should.be.a('error');
      error.message.should.match(/Unable to import/);
    }

  });

});