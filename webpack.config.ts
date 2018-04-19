import * as ngtools from '@ngtools/webpack';
import * as path from 'path';
import * as webpack from 'webpack';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as defineJson from './define/define.json';

const define = defineJson as any as Define;
const basePath: string = path.resolve(__dirname);
const srcPath: string = path.join(basePath, 'src');
const buildPath: string = path.join(basePath, 'dist');

export default {
  devServer: {
    contentBase: buildPath,
    historyApiFallback: true
  },
  entry: {
    app: [
      // polyfill
      'core-js',
      'reflect-metadata',
      'zone.js',

      //vendor
      '@angular/animations',
      '@angular/cdk',
      '@angular/common',
      '@angular/core',
      '@angular/forms',
      '@angular/http',
      '@angular/material',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router',
      'hammerjs',
      'rxjs',
      path.join(srcPath, 'vendor.scss'),

      //app
      path.join(srcPath, 'main.ts'),
      path.join(srcPath, 'main.scss')
    ]
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        polyfill: {
          test: /core-js|reflect-metadata|zone.js/,
          name: 'polyfill',
          chunks: 'all',
          enforce: true
        },
        vendor: {
          test: /@angular|'hammerjs'|'rxjs'/,
          name: 'vendor',
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: '@ngtools/webpack'
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false
            }
          }
        ]
      },
      {
        test: /\.(svg|ttf|eot|woff(2)?)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([buildPath]),
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)/, srcPath),
    new webpack.DefinePlugin({
      'API_KEY': JSON.stringify(define.flickr.apiKey),
      'USER_ID': JSON.stringify(define.flickr.userId)
    }),
    new ngtools.AngularCompilerPlugin({
      tsConfigPath: path.join(basePath, 'tsconfig.json'),
      mainPath: path.join(srcPath, 'main.ts')
    } as ngtools.AngularCompilerPluginOptions),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      favicon: path.join(srcPath, 'favicon.png')
    }),
  ]
} as webpack.Configuration;
