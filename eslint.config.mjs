export default {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      experimentalDecorators: true, // Enables support for decorators
    },
  },
  plugins: ["@babel"],
  rules: {
    // Example rules - adjust based on your needs
    "no-unused-vars": "warn",
    "no-console": "off",
  },
};
