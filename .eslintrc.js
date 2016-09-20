module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'eslint:recommended',
  // required to lint *.vue files
  // add your custom rules here
  'rules': {
        "semi": [
            "error",
            "always"
        ]
  }
}
