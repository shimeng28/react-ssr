const path = require('path');
const externals = require('webpack-node-externals');


module.exports = {
  target: 'node',
  entry: './src/server/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), './build/server')
  },
  module: {
    rules: [
      // {
      //   test: /\.css?$/,
      //   use: [ 'isomorphic-style-loader', {
      //     loader: 'css-loader',
      //     options: {
      //       modules: true,
      //       localIdentName: '[path][name]__[local]--[hash:base64:5]'
      //     }
      //   } ]
      // }
    ],
  }, 
  externals: [ externals() ],
};