export default {
  semi: true,
  singleQuote: true,
  tabWidth: 4,
  overrides: [
    {
      files: ['*.json', '*config.js'],
      options: {
        tabWidth: 2,
      },
    },
  ],
};
