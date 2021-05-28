const path = require('path');
const fs = require('fs');

function resolveDir(dir) {
  if (!/\.(t|j)s$/.test(dir)) {
    return dir;
  }
  return path.dirname(dir);
}

function writeJson(filePath, obj) {
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2));
}

module.exports = {
  resolveDir,
  writeJson,
};
