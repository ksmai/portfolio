const path = require('path');
const webpack = require('webpack');

const SRC = path.resolve(__dirname, 'src');
const APP = path.join(SRC, 'app');

module.exports = {
  devtool: 'inline-source-map',

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
        use: 'null-loader',
      },
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader'],
      },
      {
        test: /\.(?:png|jpe?g|svg|gif)$/,
        use: 'null-loader',
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
      'process.env.NODE_ENV': JSON.stringify('test'),
    }),
  ],
};
