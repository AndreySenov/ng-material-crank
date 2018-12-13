import * as ngtools from '@ngtools/webpack';
import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as defineJson from './define.json';

interface Define {
  flickr: {
    apiKey: string,
    userId: string
  }
}

const define = defineJson as Define;
const basePath: string = path.resolve(__dirname);
const srcPath: string = path.join(basePath, 'src');

export default {
  devServer: {
    historyApiFallback: true
  },
  entry: {
    app: [
      path.join(srcPath, 'main.ts'),
      path.join(srcPath, 'main.scss'),
      path.join(srcPath, 'vendor.scss')
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
        vendor: {
          test: /node_modules/,
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
