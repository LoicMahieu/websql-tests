'use strict';

module.exports = function(karma) {
  karma.set({

    frameworks: [ 'jasmine', 'browserify' ],

    files: [
      'test/websql.js'
    ],

    reporters: [ 'dots' ],

    preprocessors: {
      'test/websql.js': [ 'browserify' ]
    },

    browsers: [ 'Chrome', 'Safari', 'PhantomJS' ],

    singleRun: false,
    autoWatch: true,

    colors: true,

    // browserify configuration
    browserify: {
      debug: true,
      transform: ['babelify']
    }
  });
};
