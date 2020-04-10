module.exports = {
    "env": {
        "node": true,
        "es6": true,
        "jest/globals": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": ["jest"],
    "rules": {
        "semi": "error"
    }
};
