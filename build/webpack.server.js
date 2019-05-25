const path = require('path');
const externals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  target: 'node',
  entry: './src/server/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [ 'isomorphic-style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]'
          }
        } ]
      }
    ],
  }, 
  externals: [ externals() ],
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [ path.join(process.cwd(), '/dist') ],
    })
  ],
};