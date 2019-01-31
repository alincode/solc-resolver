require('solcjs-mock')();

const chai = require('chai');
chai.should();

const solcImport = require('solc-import');

const ResolverEngine = require('../../src/resolverEngine');
let resolverEngine = new ResolverEngine();
let resolveGithub = require('resolve-github');
resolverEngine.addResolver(resolveGithub);

describe('with solc-import combineSource', () => {

  it('case 1', async () => {
    const sourceCode = `
    import 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol';
    import 'lib.sol';

    contract Casino {
        using SafeMath for uint256;
        function example(uint256 _value) {
            uint number = msg.value.add(_value);
        }
    }`;

    let myDB = new Map();
    myDB.set('lib.sol', 'library L { function f() internal returns (uint) { return 7; } }');

    const getImportContent = async function (path) {
      return myDB.has(path) ? myDB.get(path) : await resolverEngine.require(path);
    };

    let sources = await solcImport.combineSource(sourceCode, getImportContent);
    sources.should.be.a('array');
    sources[0].should.have.all.keys('path', 'content');
  });

});