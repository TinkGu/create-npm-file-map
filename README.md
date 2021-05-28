# create-npm-file-map

# Install

```bash
yarn add -D build-npm-file-map
```

# Usage

```javascript
const { init } = require('create-npm-file-map');

const builder = init({
  /** required: your dist dir */
  outDir: 'dist',
  input: ['sub-package1', 'sub-package2'],
});

builder.build();

builder.clean();
```

# API

TODO:
