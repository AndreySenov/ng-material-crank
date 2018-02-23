const { AngularCompilerPlugin } = require('@ngtools/webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const define = require('./define.json');

const basePath = path.resolve(__dirname);
const buildPath = path.join(basePath, 'build');
const srcPath = path.join(basePath, 'src');
const assetsPath = path.join(srcPath, 'assets');

module.exports = {
  entry: {
    polyfill: path.join(srcPath, 'polyfill.ts'),
    vendor: path.join(srcPath, 'vendor.ts'),
    app: path.join(srcPath, 'main.ts')
  },
  output: {
    path: buildPath,
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  devServer: {
    contentBase: buildPath,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test:  /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: '@ngtools/webpack'
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: false
        }
      },
      {
        test: /\.(sass|scss|css)$/,
        include: srcPath,
        exclude: assetsPath,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", 'sass-loader']
        })
      },
      {
        test: /\.(jpg|png|svg)$/,
        include: srcPath,
        loader: 'url-loader',
        options: {
          limit: 32768,
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        include: srcPath,
        exclude: assetsPath,
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]',
        }
      },
      {
        test: /\.(svg|ttf|eot|woff(2)?)$/,
        include: assetsPath,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)/, srcPath),
    new webpack.DefinePlugin({
      'API_KEY': JSON.stringify(define.flickr.apiKey),
      'USER_ID': JSON.stringify(define.flickr.userId)
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new CleanWebpackPlugin([buildPath]),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      favicon: path.join(srcPath, 'favicon.png')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'polyfill'],
      filename: '[name].[chunkhash].js'
    }),
    new AngularCompilerPlugin({
      tsConfigPath: path.join(basePath, 'tsconfig.json'),
      mainPath: path.join(srcPath, 'main.ts')
    })
  ]
};
