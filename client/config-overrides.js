const { addWebpackResolve } = require('customize-cra');

module.exports = {
  webpack: function(config, env) {
    // Add fallbacks for core Node.js modules
    config = addWebpackResolve({
      fallback: {
        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "crypto": require.resolve("crypto-browserify")
      }
    })(config);

    return config;
  }
};

