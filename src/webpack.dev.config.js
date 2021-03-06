const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const {
  PROJECT_NAME,
  PROJECT_HOST,
  PROJECT_PORT
} = require('./config/global-constants');

const rootPath = path.resolve(__dirname, 'app/' + process.env.NODE_DIR);

module.exports = Object.assign(baseConfig, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'output/' + process.env.NODE_DIR + '.development'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    host: PROJECT_HOST,
    port: PROJECT_PORT,
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  module: {
    rules: baseConfig.module.rules.concat([
      {
        test: /\.(s)?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]-[hash:base64:5]',
              autoprefixer: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ],
        exclude: /node_modules/,
        include: rootPath
      }
    ])
  },
  optimization: {
    splitChunks: { chunks: 'all' },
    runtimeChunk: true
  },
  plugins: baseConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin(),
    new HtmlWebpackPlugin({
      title: PROJECT_NAME,
      hash: true,
      cache: true,
      filename: 'index.html',
      template: 'entrance/' + process.env.NODE_DIR + '.html'
    })
  ])
});
