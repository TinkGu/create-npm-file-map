const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const mergePkg = require('./merge-pkg');
const mergeGitIgore = require('./merge-gitignore');
const check = require('./check');
const addFileMapDeclarations = require('./add-declarations');
const { resolveDir, writeJson } = require('./utils');

function getMappingPkgInfo(config, moduleName) {
  const { rootPath, pkg } = config;
  const moduleMappingPath = path.resolve(rootPath, moduleName);

  function getRelativePath(p, extname) {
    extname = extname || '.js';
    const distDir = resolveDir(p);
    const dirName = path.join(rootPath, distDir, moduleName, 'index' + extname);
    const fileName = path.join(rootPath, distDir, moduleName + extname);
    let distFilePath = dirName;
    if (!fs.existsSync(dirName)) {
      distFilePath = fileName;
      if (!fs.existsSync(fileName)) {
        distFilePath = dirName;
      }
    }
    return path.relative(moduleMappingPath, distFilePath);
  }

  return {
    moduleMappingPath,
    pkg: {
      name: pkg.name + '/' + moduleName,
      module: getRelativePath(pkg.module),
      main: getRelativePath(pkg.main),
      types: getRelativePath(pkg.main, '.d.ts'),
    },
  };
}

function createMappingModule(config, moduleName) {
  fs.mkdirSync(path.join(config.rootPath, moduleName));
  const pkgInfo = getMappingPkgInfo(config, moduleName);
  const pkgPath = path.resolve(pkgInfo.moduleMappingPath, 'package.json');
  writeJson(pkgPath, pkgInfo.pkg);
}

function createMapping(config) {
  config.input.forEach((x) => {
    createMappingModule(config, x);
  });
}

function init(options) {
  if (!options) {
    throw new Error('options can not be undefined');
  }

  if (!options.outDir) {
    throw new Error('options.outDir is required');
  }

  if (options.input && !Array.isArray(options.input)) {
    throw new Error('options.input must be an array');
  }

  const rootPath = options.rootPath || process.cwd();
  const pkg = require(path.join(rootPath, 'package.json'));

  const config = {
    rootPath,
    outDir: options.outDir,
    input: options.input,
    pkg,
  };

  function clean() {
    config.input
      .map((x) => path.resolve(rootPath, x))
      .forEach((name) => {
        rimraf.sync(name);
      });
  }

  function build() {
    check(config);
    clean(config);
    createMapping(config);
    addFileMapDeclarations(config);
    mergePkg(config);
    mergeGitIgore(config);
  }

  return {
    build,
    clean,
  };
}

module.exports = {
  init,
};
