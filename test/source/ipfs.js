require('../utils/mock')();

const chai = require('chai');
chai.should();

const solcResolver = require('../../src');

describe('ipfs', () => {

  it('found', async () => {
    const path = 'ipfs://QmTeW79w7QQ6Npa3b1d5tANreCDxF2iDaAPsDvW6KtLmfB/styles/jquery/jquery.min.js';
    let content = await solcResolver.getImportContent(path);
    content.should.be.a('string');
    content.length.should.be.above(50);
  });

  it('no found', async () => {
    const path = 'ipfs://QmTeW79w7QQ6Npa3b1d5tANreCDxF2iDaAPsDvW6KtLmfB/styles/jquery/jquery2.min.js';
    try {
      await solcResolver.getImportContent(path);
    } catch (error) {
      error.should.be.a('error');
      error.message.should.be.a('string');
      error.message.substring(0, 12).should.be.eq('ipfs resolve');
    }
  });

});