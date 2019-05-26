const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const isProduction = process.env.NODE_ENV === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const reactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;

module.exports = {
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../static')
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
    usedExports: true,
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
      filename: 'tmp.html',
      template: path.resolve(process.cwd(), './public/index.html'),
      favicon: path.resolve(process.cwd(), './public/favicon.ico')
    }),
    new reactLoadablePlugin({
      filename: path.resolve(process.cwd(), './public/react-loadable.json'),
    }),
  ],
};