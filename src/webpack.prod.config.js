const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { PROJECT_NAME } = require('./config/global-constants');

const rootPath = path.resolve(__dirname, 'app/' + process.env.NODE_DIR);

module.exports = Object.assign(baseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'output/' + process.env.NODE_DIR + '.production'),
    filename: 'js/[name].js',
    publicPath: '../'
  },
  module: {
    rules: baseConfig.module.rules.concat([
      {
        test: /\.(s)?css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    splitChunks: {
      cacheGroups: {
        default: false,
        // Custom common chunk
        bundle: {
          name: 'commons',
          chunks: 'all',
          minChunks: 3,
          reuseExistingChunk: false
        },
        // Customer vendor
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: m => /node_modules/.test(m.context)
        }
      }
    }
  },
  plugins: baseConfig.plugins.concat([
    new MiniCssExtractPlugin({
      filename: 'css/app.css'
    }),
    new OptimizeCSSAssetsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      title: PROJECT_NAME,
      hash: true,
      cache: false,
      filename: 'index.html',
      template: 'entrance/'+process.env.NODE_DIR+'.html'
    })
  ])
});
