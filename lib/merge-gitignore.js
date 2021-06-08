const path = require('path');
const fs = require('fs');
const parseIgnore = require('parse-gitignore');

/** add file-maps to .gitignore */
module.exports = function mergeGitIgore(configs) {
  const { rootPath, input } = configs;
  const igPath = path.join(rootPath, '.gitignore');
  if (!fs.existsSync(igPath)) {
    return;
  }

  const ignoreList = parseIgnore(fs.readFileSync(igPath));
  const needAppends = input.map((x) => '/' + x + '/').filter((x) => !ignoreList.includes(x));

  if (needAppends.length) {
    const stream = fs.createWriteStream(igPath, {
      flags: 'a',
    });
    needAppends.forEach((x) => {
      stream.write('\r');
      stream.write(x);
    });
    stream.close();
  }
};
