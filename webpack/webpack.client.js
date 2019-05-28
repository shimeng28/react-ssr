const path = require('path');
const fs = require('fs');
const isProduction = process.env.NODE_ENV === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const reactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const config = {
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(process.cwd(), './build/client')
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [ 
          {
            loader: MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProduction ? '[id].[hash].css' : '[id].css'
    }),
    new HtmlWebpackPlugin({
      filename: '~tmp.html',
      template: path.resolve(process.cwd(), './public/index.html'),
      favicon: path.resolve(process.cwd(), './public/favicon.ico'),
      chunks: [ 'main' ]
    }),
    new reactLoadablePlugin({
      filename: path.resolve(process.cwd(), './public/react-loadable.json'),
    }),
  ],
};
const plugins = config.plugins;
const files = fs.readdirSync(path.resolve(process.cwd(), './build/dll'));

files.forEach(file => {
  if (/\.dll\.js$/.test(file)) {
    plugins.push(new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(process.cwd(), './build/dll', file),
    }));
  }

  if (/\.manifest\.json$/.test(file)) {
    plugins.push(new webpack.DllReferencePlugin({
      manifest: path.resolve(process.cwd(), './build/dll', file),
    }));
  }
});

module.exports = config;