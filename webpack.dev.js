const HTMLPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const DOCS = path.resolve(__dirname, 'docs');
const SRC = path.resolve(__dirname, 'src');
const APP = path.join(SRC, 'app');
const INDEX = path.join(SRC, 'index.html');
const MAIN = path.join(SRC, 'main.ts');
const POLYFILLS = path.join(SRC, 'polyfills.ts');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    polyfills: POLYFILLS,
    main: MAIN,
  },

  output: {
    path: DOCS,
    filename: '[name].bundle.js',
    publicPath: '/portfolio/',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'raw-loader',
      },
      {
        test: /\.(?:sa|s?c)ss$/,
        include: APP,
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(?:sa|s?c)ss$/,
        exclude: APP,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader'],
      },
      {
        test: /\.(?:png|jpe?g|svg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ContextReplacementPlugin(
      /angular(?:\\|\/)core(?:\\|\/)@angular/,
      SRC,
      {}
    ),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HTMLPlugin({
      template: INDEX,
    }),
  ],

  devServer: {
    noInfo: true,
    hot: true,
  },
};
