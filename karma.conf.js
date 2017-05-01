const FILE = './karma-test-shim.js';

module.exports = function (config) {
  config.set({
    files: [FILE],

    preprocessors: {
      [FILE]: ['webpack', 'sourcemap'],
    },

    webpack: require('./webpack.test'),

    webpackMiddleware: {
      stats: 'errors-only',
    },

    webpackServer: {
      noInfo: true,
    },

    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    reporters: ['progress', 'kjhtml'],
    singleRun: true,
    autoWatch: false,
  });
};
