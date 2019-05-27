const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    react: [
      'react', 'react-dom'
    ],
  },
  output: {
    filename: '[name].[hash].dll.js',
    path: path.resolve(process.cwd(), './build/dll'),
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(process.cwd(), './build/dll/[name].manifest.json')
    })
  ],
};