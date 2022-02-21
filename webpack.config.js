const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: "production",
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      }
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
  },
};
