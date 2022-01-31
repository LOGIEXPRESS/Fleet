// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//   };
// };

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: '.env',
          blacklist: null,
          allowlist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
          verbose: false
        },
      ],
    ],
  };
};