module.exports = {
  arrowParens: 'always',
  singleQuote: true,
  printWidth: 120,
  jsxSingleQuote: true,
  tabWidth: 2,
  semi: true,
  "overrides": [
    {
      "files": "src/contracts/*.sol",
      "options": {
        "printWidth": 160,
        "useTabs": true,
        "tabWidth": 4,
        "bracketSpacing": true,
        "explicitTypes": "always"
      }
    }
  ]
};
