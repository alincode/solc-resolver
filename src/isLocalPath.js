const sourceHandlers = require('./source');

module.exports = isLocalPath;

function isLocalPath(importPath) {
  let found = false;
  for (let handerType in sourceHandlers) {
    if (found) break;
    const match = sourceHandlers[handerType].match.exec(importPath);
    if (match) found = true;
  }
  return !found;
}