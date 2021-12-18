# Autheticator
Manage Authenticator and Authorization scopes in the API


## Notes

Configuring `jest` using `package.json` we can either use these matching options, one to check according to file extensions `.spec.ts` or `.test.ts` or collocate all tests in a `__tests__` directory, currently unresolved on to manage this. See settings below

```js
// Matching according to folder
  "testMatch": [
    "**/__tests__/*.+(ts|tsx|js)"
  ],

  // Match according to file extension
  "testRegex": "\\.spec\\.ts",
```

Nodemon Config

```json
{
  "restartable": "rs",
  "ignore": [
    ".git",
    "node_modules/**/node_modules",
    "__tests__",
    "src/__generated__"
  ],
  "verbose": true,
  "execMap": {
    "ts": "node --require ts-node/register"
  },
  "exec": "ts-node-dev --respawn --transpile-only src/entry.ts",
  "watch": [
    "src/",
    "dist/"
  ],
  "env": {
    "NODE_ENV": "development"
  },
  "ext": "js,json,ts,graphql"
}
```

The execMap defines which binary nodemon uses to execute `*.ts` file extensions see this (article)[https://www.digitalocean.com/community/tutorials/workflow-nodemon] which the exec command disregards that and executes the command, think of it as `ENTRYPOINT` versus `CMD` in docker. To only watch transpiles in dev `NODE_ENV=development TS_NODE_FILES=true TS_NODE_TRANSPILE_ONLY=true nodemon src/entry.ts`

```json
/* Using SWC or other compilers to speed up development builds */
  "scripts": {
    "build": "run-s build:clean build:code",
    "build:clean": "rimraf dist",
    "build:code": "tsc",
    "checks": "tsc --pretty && yarn test",
    "dev": "cross-env NODE_ENV=development ts-node-dev --respawn --transpile-only src/entry.ts",
    "dev:swc": "cross-env NODE_ENV=development npx swc src -d build --watch &> /dev/null && nodemon build/entry.js",
    "dev:tsc": "cross-env NODE_ENV=development TS_NODE_FILES=true TS_NODE_TRANSPILE_ONLY=true nodemon ts-node src/entry.ts",
    "dev:debug": "nodemon --inspect src/entry.ts",
    "format": "prettier --write **/*.{js,ts}",
    "lint": "eslint . --ext .ts",
    "lint:fix": "eslint . --ext .ts --fix",
    "restart": "run-s build && node dist/entry.js",
    "start": "node dist/entry.js",
    "test": "jest --no-cache --testTimeout 20000"
  }
// NODE_ENV=development TS_NODE_FILES=true TS_NODE_TRANSPILE_ONLY=true yarn ts-node src/entry.ts

```
