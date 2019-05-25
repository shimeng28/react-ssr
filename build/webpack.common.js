const path = require('path');
const merge = require('webpack-merge');
const clientConfig = require('./webpack.client.js');
const serverConfig = require('./webpack.server.js');


const commonConfig = {
  mode: 'development',
  devtool: 'inline-cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  }, 
  resolve: {
    alias: {
      Store: path.resolve(process.cwd(), './src/store'),
      Components: path.resolve(process.cwd(), './src/components'),
      Container: path.resolve(process.cwd(), './src/container'),
    },
    mainFiles: [ 'index' ],
    extensions: [ '.js' ],
  }
};


module.exports = env => {
  console.log(env);
  if (env.side === 'client') {
    return merge(commonConfig, clientConfig);
  }
  return merge(commonConfig, serverConfig);
}