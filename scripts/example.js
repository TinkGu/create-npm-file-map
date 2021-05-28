const path = require('path');
const { init } = require('../lib');

const builder = init({
  outDir: 'out',
  rootPath: path.resolve(__dirname, '../examples/after'),
  input: ['a', 'b', 'sub'],
});

builder.build();
