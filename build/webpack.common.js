const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const clientConfig = require('./webpack.client.js');
const serverConfig = require('./webpack.server.js');
const isProduction = process.env.NODE_ENV === 'production';

const makePlugins = () => {
  const plugins = [
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*'],
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProduction ? '[id].[hash].css' : '[id].css'
    })
  ];

  return plugins;
};

const commonConfig = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'inline-cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
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
              importLoaders: 1,
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  }, 
  plugins: makePlugins(),
  resolve: {
    alias: {
      Store: path.resolve(process.cwd(), './src/store/'),
      Components: path.resolve(process.cwd(), './src/components/'),
      Container: path.resolve(process.cwd(), './src/container/'),
    },
    mainFiles: [ 'index' ],
    extensions: [ '.js', '.jsx' ],
  }
};

if (!isProduction) {

}


module.exports = env => {
  console.log(env);
  if (env.side === 'client') {
    return merge(commonConfig, clientConfig);
  }
  return merge(commonConfig, serverConfig);
}