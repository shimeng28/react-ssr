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
    })
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
        use: 'babel-loader',
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
            }
          }
        ]
      }
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
  commonConfig.optimization = {
    usedExports: true
  };
}


module.exports = env => {
  console.log(env);
  const isClient = env.side === 'client';

  if (isClient) {
    return merge(commonConfig, clientConfig);
  }
  return merge(commonConfig, serverConfig);
}