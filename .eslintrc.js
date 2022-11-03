module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  rules: {
    'prettier/prettier': 0,
    "semi": 2,
    "semi-spacing": 2,
    "no-extra-semi": 2,
    "keyword-spacing": 2,
    'no-trailing-spaces': 2,
    "global-require": 0,
    "react/forbid-prop-types": 2,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx"]
      }
    ],
    "no-control-regex": 0,
    "no-extra-boolean-cast": 0,
    "guard-for-in": 0,
    "no-underscore-dangle": [
      0,
      {
        "allowAfterThis": true
      }
    ],
    "react/no-array-index-key": 0,
    "max-len": [
      "error",
      {
        "code": 160,
        "ignoreComments": true,
        "ignoreRegExpLiterals": true
      }
    ],
    "import/no-named-as-default": "off",
    "import/prefer-default-export": "off",
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "prefer-destructuring": 1,
    "no-else-return": 0,
    "react/require-default-props": 0,
    "react/no-string-refs": 0,
    "react/jsx-max-props-per-line": [2, { "maximum": 2, "when": "multiline" }],
    "no-unused-vars": ["error", { "args": "none" }],
    "key-spacing": ["error", { "mode": "minimum" }],
    "arrow-body-style": [
      0,
      "as-needed",
      {
        "requireReturnForObjectLiteral": true
      }
    ],
    "comma-dangle": ["error", "never"],
    "react/jsx-no-bind": [
      "error",
      {
        "ignoreRefs": true,
        "allowArrowFunctions": true,
        "allowBind": false
      }
    ],
    "react/jsx-wrap-multilines": 0,
    "no-multi-spaces": ["error", { "ignoreEOLComments": true }],
    "padded-blocks": 0,
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "import/no-dynamic-require": 0,
    "operator-linebreak": [
      "error",
      "after",
      {
        "overrides": {
          ":": "before"
        }
      }
    ],
    "eol-last": 2,
    "react-native/no-inline-styles": 0,
    "react/jsx-curly-spacing": 2,
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "import/extensions": ["error", "ignorePackages", {
      "ts": "never",
      "tsx": "never",
      "js": "never",
      "jsx": "never",
      "mjs": "never"
    }],
    "no-console": 1,
    "import/order": ["error", {"newlines-between": "always-and-inside-groups"}]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    }
  }
};
