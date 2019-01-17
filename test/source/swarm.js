require('../utils/mock')();

const chai = require('chai');
chai.should();

const solcResolver = require('../../src');

describe('swarm', () => {

  it('found', async () => {
    const path = 'bzz:/photoalbum.eth/';
    let content = await solcResolver.getImportContent(path);
    content.should.be.a('string');
    content.length.should.be.above(50);
  });

  it('not found', async () => {
    const path = 'bzz:/photoalbum.eta/';
    try {
      await solcResolver.getImportContent(path);
    } catch (error) {
      error.should.be.a('error');
      error.message.should.be.a('string');
      error.message.substring(0, 9).should.be.eq('Code: 404');
    }
  });

});