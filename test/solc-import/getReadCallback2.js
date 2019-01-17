require('../utils/mock')();

const chai = require('chai');
chai.should();

const solcImport = require('solc-import');
const solcResolver = require('../../src');

describe('getReadCallback2', () => {

  before(() => {
    // fetchMock.mock('https://api.github.com/repos/alincode/30-days-smart-contract/contents/src/SimpleStorage.sol', require('../utils/SimpleStorage.json'));
    // fetchMock.mock('https://api.github.com/repos/alincode/30-days-smart-contract/contents/src/oo/SimpleStorage2.sol', require('../utils/SimpleStorage2.json'));

    // fetchMock.mock('https://api.github.com/repos/alincode/30-days-smart-contract/contents/src/oo/SimpleStorage3.sol', require('../utils/SimpleStorage3.json'));
  });

  it('case 1', async () => {

    const sourceCode = `
    pragma solidity >0.4.99 <0.6.0;

    import 'https://github.com/alincode/30-days-smart-contract/src/SimpleStorage.sol';

    library OldLibrary {
      function someFunction(uint8 a) public returns(bool);
    }

    contract NewContract {
      function f(uint8 a) public returns (bool) {
          return OldLibrary.someFunction(a);
      }
    }`;

    const getImportContent = async function (path) {
      return await solcResolver.getImportContent(path);
    };

    let readCallback = await solcImport.getReadCallback(sourceCode, getImportContent);
    readCallback.should.be.a('function');

    let contentObject1 = readCallback('https://github.com/alincode/30-days-smart-contract/src/SimpleStorage.sol');
    contentObject1.should.be.a('object');
    contentObject1.should.have.all.keys('contents');
    contentObject1.contents.should.be.a('string');

    let contentObject2 = readCallback('https://github.com/alincode/30-days-smart-contract/src/oo/SimpleStorage2.sol');
    contentObject2.should.be.a('object');
    contentObject2.should.have.all.keys('contents');
    contentObject2.contents.should.be.a('string');

    let contentObject3 = readCallback('https://github.com/alincode/30-days-smart-contract/src/oo/SimpleStorage3.sol');
    contentObject3.should.be.a('object');
    contentObject3.should.have.all.keys('contents');
    contentObject3.contents.should.be.a('string');

  });

  after(() => {
    // fetchMock.restore();
  });

});