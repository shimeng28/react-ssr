const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const isProduction = process.env.NODE_ENV === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      {
        test: /\.(ico)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              limit: 50,
              outputPath: '/',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'tmp.html',
      template: path.resolve(process.cwd(), './public/index.html'),
      favicon: path.resolve(process.cwd(), './public/favicon.ico')
    }),
  ],
};