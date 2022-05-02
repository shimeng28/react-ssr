const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const clientConfig = require('./webpack.client.js');
const serverConfig = require('./webpack.server.js');

const isProduction = process.env.NODE_ENV === 'production';

const makePlugins = () => {
  const plugins = [
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*'],
    }),
  ];

  return plugins;
};

const commonConfig = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'inline-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(ico|png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: isProduction ? '[hash].[ext]' : '[name].[ext]',
              limit: 8192,
              outputPath: 'assert',
            },
          },
        ],
      },
    ],
  },
  plugins: makePlugins(),
  resolve: {
    alias: {
      styles: path.resolve(process.cwd(), 'src/assets/styles'),
      images: path.resolve(process.cwd(), 'src/assets/images'),
    },
    mainFiles: ['index'],
    extensions: ['.js', '.jsx'],
  },
};

if (!isProduction) {
  commonConfig.optimization = {
    usedExports: true,
  };
}


module.exports = (env) => {
  const isClient = env.side === 'client';

  if (isClient) {
    return merge(commonConfig, clientConfig);
  }
  return merge(commonConfig, serverConfig);
};
