// require('./utils/mock')();

// const chai = require('chai');
// chai.should();

// const solcjs = require('../../src/index');
// const solcResolver = require('../../src/lib/solc-resolver');

// describe('compiler', () => {

//   const version = 'v0.5.1-stable-2018.12.03';

//   it('with local import', async () => {
//     let compiler = await solcjs(version);
//     compiler.should.be.a('function');

//     const sourceCode = `
//     pragma solidity >0.4.99 <0.6.0;

//     import "lib.sol";

//     library OldLibrary {
//       function someFunction(uint8 a) public returns(bool);
//     }

//     contract NewContract {
//       function f(uint8 a) public returns (bool) {
//           return OldLibrary.someFunction(a);
//       }
//     }`;

//     let myDB = new Map();
//     myDB.set('lib.sol', 'library L { function f() internal returns (uint) { return 7; } }');

//     const getImportContent = async function (path) {
//       return myDB.has(path) ? myDB.get(path) : await solcResolver.getImportContent(path);
//     };

//     let output = await compiler(sourceCode, getImportContent);
//     let item = output[0];
//     item.should.have.all.keys('name', 'abi', 'sources', 'compiler', 'assembly', 'binary', 'metadata');
//     item.metadata.analysis.should.have.all.keys('warnings', 'others');
//   });

//   it('with github import', async () => {
//     let compiler = await solcjs('v0.5.0-stable-2018.11.13');
//     compiler.should.be.a('function');
//     const sourceCode = `
//     import 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol';

//     library OldLibrary {
//         function someFunction(uint8 a) public returns(bool);
//     }

//     contract NewContract {
//         function f(uint8 a) public returns (bool) {
//             return OldLibrary.someFunction(a);
//         }
//     }`;

//     let output = await compiler(sourceCode);
//     let item = output[0];
//     item.should.have.all.keys('name', 'abi', 'sources', 'compiler', 'assembly', 'binary', 'metadata');
//     item.metadata.analysis.should.have.all.keys('warnings', 'others');
//   });

// });