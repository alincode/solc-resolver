const solcImport = require('solc-import');

module.exports = replaceContent;

function replaceContent(content, from, pathResolve) {
  let newContent = content;
  if (solcImport.isExistImport(content)) {
    const allSubImportPath = solcImport.getImports(content);
    for (let subImportPath of allSubImportPath) {
      if (isExplicitlyRelative(subImportPath)) {
        newContent = pathResolve(newContent, from, subImportPath);
      }
    }
  }
  return newContent;
}

function isExplicitlyRelative(importPath) {
  return importPath.indexOf('.') === 0;
}