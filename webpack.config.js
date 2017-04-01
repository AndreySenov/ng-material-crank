const { CheckerPlugin } = require('awesome-typescript-loader')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const define = require('./define.json');

const basePath = path.resolve(__dirname);
const buildPath = path.join(basePath, 'build');
const srcPath = path.join(basePath, 'src');

module.exports = {
  entry: {
    app: [path.join(srcPath, 'main.ts')],
    vendor: [path.join(srcPath, 'vendor.ts')]
  },
  output: {
    path: buildPath,
    filename: '[name].js'
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
        test: /\.ts$/,
        loaders: [
          'angular2-template-loader',
          'awesome-typescript-loader'
        ]
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
        exclude: path.join(srcPath, 'assets'),
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
        exclude: path.join(srcPath, 'assets'),
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]',
        }
      },
      {
        test: /\.(svg|ttf|eot|woff(2)?)$/,
        include: path.join(srcPath, 'assets'),
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    //XXX https://github.com/angular/angular/issues/11580
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      srcPath
    ),
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(process.env.NODE_ENV),
      'API_KEY': JSON.stringify(define.flickr.apiKey),
      'USER_ID': JSON.stringify(define.flickr.userId)
    }),
    new ExtractTextPlugin("[name].css"),
    new CheckerPlugin(),
    new CleanWebpackPlugin([buildPath]),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      favicon: path.join(srcPath, 'favicon.png'),
      hash: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js"
    })
  ]
};
