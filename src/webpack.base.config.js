const path = require('path');
const url = require('url');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const globalConstants = require('./config/global-constants');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const rootPath = path.resolve(__dirname, 'app/' + process.env.NODE_DIR);

module.exports = {
  cache: true,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/,
        include: rootPath
      },
      {
        test: /\.json$$/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'json-loader'
          }
        ],
        exclude: /node_modules/,
        include: rootPath
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[hash].[ext]'
            }
          },
          {
            loader: 'img-loader'
          }
        ],
        exclude: /node_modules/,
        include: rootPath
      },
      {
        test: /\.(mp4|swf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[ext]'
            }
          }
        ],
        exclude: /node_modules/,
        include: rootPath
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]'
            }
          }
        ],
        exclude: /node_modules/,
        include: rootPath
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ],
        exclude: /node_modules/,
        include: path.resolve(rootPath, 'assets/fonts')
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~': path.resolve(rootPath, 'dist'),
      '@': path.resolve(rootPath, 'assets'),
      ext: path.resolve(rootPath, 'extensions')
    }
  },
  externals: {
    Config: JSON.stringify(globalConstants)
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: false,
      generateStatsFile: false,
      statsOptions: null,
      logLevel: 'info'
    }),
    new LodashModuleReplacementPlugin({
      shorthands: true,
      collections: true
    })
  ],
  entry: {
    bundle: [
      'es6-promise',
      'whatwg-fetch',
      path.resolve(rootPath, 'main.js')
    ]
  }
};
