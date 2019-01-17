module.exports = getErrorMessage;

function getErrorMessage(importPath) {
  if (/^[^:]*:\/\//.exec(importPath)) {
    return `Unable to import ${importPath}: Unsupported URL schema`;
  } else {
    return `Unable to import ${importPath} File not found`;
  }
}