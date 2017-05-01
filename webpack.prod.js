const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const FaviconsPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;

const DOCS = path.resolve(__dirname, 'docs');
const SRC = path.resolve(__dirname, 'src');
const APP = path.join(SRC, 'app');
const INDEX = path.join(SRC, 'index.html');
const MAIN = path.join(SRC, 'main.ts');
const POLYFILLS = path.join(SRC, 'polyfills');
const TSCONFIG = path.join(__dirname, 'tsconfig.json');
const APP_MODULE = path.join(APP, 'app.module') + '#AppModule';
const FAVICON = path.join(__dirname, 'assets', 'favicon.png');

module.exports = {
  devtool: 'source-map',

  entry: {
    polyfills: POLYFILLS,
    main: MAIN,
  },

  output: {
    path: DOCS,
    publicPath: '/portfolio',
    filename: '[name].[chunkhash].js',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true,
            conservativeCollapse: false,
          },
        },
      },
      {
        test: /\.(?:sa|s?c)ss$/,
        include: APP,
        use: [
          'to-string-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(?:sa|s?c)ss$/,
        exclude: APP,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.ts$/,
        use: '@ngtools/webpack',
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
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ContextReplacementPlugin(
      /angular(?:\\|\/)core(?:\\|\/)@angular/,
      SRC,
      {}
    ),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.[chunkhash].js',
      chunks: ['main'],
      minChunks: function (module) {
        return module.context &&
          module.context.indexOf('node_modules') !== -1;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest.[chunkhash].js',
      minChunks: Infinity,
    }),
    new AotPlugin({
      tsConfigPath: TSCONFIG,
      entryModule: APP_MODULE,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new HTMLPlugin({
      template: INDEX,
      minify: {
        collapseWhitespace: true,
        caseSensitive: true,
      },
    }),
    new HTMLPlugin({
      filename: '404.html',
      template: INDEX,
      minify: {
        collapseWhitespace: true,
        caseSensitive: true,
      },
    }),
    new FaviconsPlugin(FAVICON),
  ],
};
