const path = require('path');
const writePkg = require('write-pkg');

/** auto add `npmName`, `npmFileMap` fields to package.json */
function writePkgFileMap(config) {
  const { pkg, outDir } = config;
  const npmName = pkg.name;
  const npmFileMap = [
    {
      basePath: '/' + outDir + '/',
      files: ['*.js'],
    },
  ];

  const hasName = pkg.npmName === npmName;
  const pkgFileMap = pkg.npmFileMap && pkg.npmFileMap[0] && pkg.npmFileMap[0].basePath;
  const hasFileMap = pkgFileMap === npmFileMap[0].basePath;
  const shouldWrite = !hasName || !hasFileMap;

  return [{ npmName, npmFileMap }, shouldWrite];
}

/** auto add `files` field to package.json */
function writePkgFiles(config) {
  const { outDir, input, pkg } = config;
  const files = [outDir, ...input];

  const needFiles = [];
  const pkgFiles = pkg.files || [];
  files.forEach((x) => {
    if (!pkgFiles.includes(x)) {
      needFiles.push(x);
    }
  });

  return [{ files }, !!needFiles.length];
}

/** auto add fields by `input` to package.json */
module.exports = function mergePkg(config) {
  const { pkg, rootPath } = config;
  const [fileMap, shouldWriteFileMap] = writePkgFileMap(config);
  const [files, shouldWriteFiles] = writePkgFiles(config);

  if (shouldWriteFileMap || shouldWriteFiles) {
    writePkg(path.join(rootPath, 'package.json'), {
      ...pkg,
      ...files,
      ...fileMap,
    });
  }
};
