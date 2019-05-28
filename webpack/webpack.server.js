const path = require('path');
const externals = require('webpack-node-externals');
const ServerMiniCssExtractPlugin = require('./utils/serverMiniCssExtractPlugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  target: 'node',
  entry: './src/server/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), './build/server')
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [ 
          {
            loader: ServerMiniCssExtractPlugin.loader,
            // loader: 'null-loader',
            options: {
              hmr: !isProduction,
              reloadAll: true,
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[local]--[hash:base64:5]'
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
    ],
  }, 
  plugins: [
    new ServerMiniCssExtractPlugin({
      filename: isProduction ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProduction ? '[id].[hash].css' : '[id].css'
    }),
  ],
  // module: {
    // rules: [
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
    // ],
  // }, 
  externals: [ externals() ],
};