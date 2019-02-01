module.exports = class ResolverEngine {
  constructor() {
    this.resolvers = [];
    this.previouslyHandled = {};
  }
  
  // get data
  async require(importPath) {
    for (let resolve of this.resolvers) {
      if (this.getResolverType(importPath) == resolve.type) {
        const result = await resolve.parser(importPath);
        if (result) return result;
      }
    }
    return;
  }

  // chain pattern
  addResolver(resolver) {
    this.resolvers.push(resolver);
    return this;
  }

  getResultFromImported(imported, importPath) {
    return {
      content: imported.content,
      type: imported.type,
      importPath
    };
  }

  getResolverType(url) {
    for (let resolver of this.resolvers) {
      let match = resolver.match.exec(url);
      if (match) {
        return resolver.type;
      }
    }
    return;
  }

  isMatch(importPath) {
    let found = false;
    if (this.resolvers.length == 0) return false;
    for (let resolver of this.resolvers) {
      if (found) break;
      const match = resolver.match.exec(importPath);
      if (match) found = true;
    }
    return !found;
  }
};