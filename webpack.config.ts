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
    historyApiFallback: true,
    host: '0.0.0.0'
  },
  entry: {
    polyfill: path.join(srcPath, 'polyfill.ts'),
    app: [
      path.join(srcPath, 'main.ts'),
      path.join(srcPath, 'main.scss'),
      path.join(srcPath, 'vendor.scss')
    ]
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /(?=.*\bnode_modules\b)(?!.*\b(core-js|reflect-metadata|zone\.js)\b)(.+)/,
          name: 'vendor',
          chunks: 'all'
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
    new webpack.DefinePlugin({
      'API_KEY': JSON.stringify(process.env.FLICKR_API_KEY || define.flickr.apiKey),
      'USER_ID': JSON.stringify(process.env.FLICKR_USER_ID || define.flickr.userId)
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ngtools.AngularCompilerPlugin({
      tsConfigPath: path.join(basePath, 'tsconfig.json'),
      mainPath: path.join(srcPath, 'main.ts')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      favicon: path.join(srcPath, 'favicon.png'),
      chunksSortMode: 'manual',
      chunks: ['runtime', 'polyfill', 'vendor', 'app'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ]
};
