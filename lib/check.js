const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

module.exports = function check(config) {
  const { outDir, rootPath } = config;
  if (!fs.existsSync(path.join(rootPath, outDir))) {
    console.log(
      chalk.red('can not find out dir ' + chalk.bold.underline(outDir) + ', please run create-npm-file-map after building app dist'),
    );
    return false;
  }
  return true;
};
