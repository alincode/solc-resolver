const sources = require('./source');
const getResolverType = require('./getResolverType');
const getErrorMessage = require('./getErrorMessage');
let previouslyHandled = {};

module.exports = getImportContent;

async function getImportContent(importPath) {
  const imported = previouslyHandled[importPath];
  // get source from cache
  if (imported) {
    let result = getResultFromImported(imported, importPath);
    return result.content;
  }

  let found = isFoundHander(importPath);
  if (!found) throw Error(getErrorMessage(importPath));

  const handlerType = getResolverType(importPath);
  const sourceHander = sources[handlerType];
  
  try {
    let content = await sourceHander.getSource(importPath);  
    previouslyHandled[importPath] = {
      content: content,
      type: handlerType,
      importPath
    };
    return content;
  } catch (error) {
    // console.error('Unable to import:', error);
    throw error;
  }
}

function getResultFromImported(imported, importPath) {
  return {
    content: imported.content,
    type: imported.type,
    importPath
  };
}

function isFoundHander(url) {
  return getResolverType(url) != undefined;
}