module.exports = {
    "plugins": ["jest"],
    "extends": ["airbnb-base", "plugin:jest/recommended"],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "jest/globals": true
    }
};