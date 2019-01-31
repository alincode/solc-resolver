const chai = require('chai');
chai.should();

const ResolverEngine = require('../src/resolverEngine');
let resolverEngine = new ResolverEngine();
let resolveGithub = require('resolve-github');
resolverEngine.addResolver(resolveGithub);

describe('require', () => {

  it('found', async () => {
    const uri = 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol';
    const content = await resolverEngine.require(uri);
    content.should.be.a('string');
    const content2 = await resolverEngine.require(uri);
    content2.should.be.a('string');
  });

  it('not found', async () => {
    const uri = 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.soll';
    try {
      await resolverEngine.require(uri);  
    } catch (error) {
      error.should.be.a('error');
      error.message.should.match(/Content 404: Not Found/);
    }
  });
});