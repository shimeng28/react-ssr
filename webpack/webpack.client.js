const path = require('path');
const fs = require('fs');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const isProduction = process.env.NODE_ENV === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const reactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;
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
      // {
      //   test: /\.css$/,
      //   use: [ 
      //     'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 1,
      //         modules: true,
      //         localIdentName: '[path][name]__[local]--[hash:base64:5]'
      //       }
      //     },
      //     'postcss-loader'
      //   ]
      // },
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'main',
          chunks: 'all',
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '~tmp.html',
      template: path.resolve(process.cwd(), './public/index.html'),
      favicon: path.resolve(process.cwd(), './public/favicon.ico')
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