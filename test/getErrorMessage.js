const chai = require('chai');
chai.use(require('chai-match'));
chai.should();

const ResolverEngine = require('../src/resolverEngine');
let resolverEngine = new ResolverEngine();
let resolveGithub = require('resolve-github');
resolverEngine.addResolver(resolveGithub);

describe('getErrorMessage', () => {

  it('case 1', async () => {
    try {
      const path = 'app://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol';
      await resolverEngine.require(path);
    } catch (error) {
      error.should.be.a('error');
      error.message.should.match(/Unable to import/);
    }
  });

  it('case 2', async () => {
    try {
      const path = 'bb:/raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol';
      
      await resolverEngine.require(path);
    } catch (error) {
      error.should.be.a('error');
      error.message.should.match(/Unable to import/);
    }

  });

});