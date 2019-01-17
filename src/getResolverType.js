const sources = require('./source');

module.exports = getResolverType;

function getResolverType(url) {
  for (let sourceType in sources) {
    let match = sources[sourceType].match.exec(url);
    if (match) {
      return sourceType;
    }
  }
  return;
}