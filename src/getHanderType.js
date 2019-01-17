const sources = require('./source');

module.exports = getHanderType;

function getHanderType(url) {
  for (let sourceType in sources) {
    let match = sources[sourceType].match.exec(url);
    if (match) {
      return sourceType;
    }
  }
  return;
}