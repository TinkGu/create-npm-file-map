const fs = require('fs');
const path = require('path');

function genDeclarations(config) {
  const { input, pkg } = config;
  return input.reduce((result, key) => {
    const moduleName = pkg.name + '/' + key;
    result += `\ndeclare module "${moduleName}" {}`;
    return result;
  }, '');
}

module.exports = function addFileMapDeclarations(config) {
  const types = config.pkg.types || config.pkg.typings;
  if (!types) {
    return;
  }
  const typesPath = path.resolve(config.rootPath, types);

  if (!fs.existsSync(typesPath)) {
    return;
  }

  const declarations = genDeclarations(config);
  fs.appendFileSync(typesPath, declarations);
};
