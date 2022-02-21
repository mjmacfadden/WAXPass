const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: "production",
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
