const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'lazyloadLibrary.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'lazyloadLibrary',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true
  }
};