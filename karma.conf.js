'use strict';

module.exports = function(karma) {
  var BROWSERS = process.env.BROWSERS || '';
  var isSauce = !!BROWSERS.match(/^Sauce/);

  var customLaunchers = {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '35'
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '30'
    },
    sl_ios_safari: {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'OS X 10.9',
      version: '7.1'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    }
  };

  var customSauce = BROWSERS.match(/^SauceLab\((.+),(.+),(.+)\)$/);
  if (customSauce) {
    customLaunchers = {
      sl_custom: {
        base: 'SauceLabs',
        browserName: customSauce[0],
        platform: customSauce[1],
        version: customSauce[2]
      }
    };
  }

  karma.set({
    sauceLabs: {
      testName: 'WebSQL Tests'
    },
    customLaunchers: customLaunchers,

    frameworks: [ 'jasmine', 'browserify' ],

    files: [
      'test/websql.js'
    ],

    preprocessors: {
      'test/websql.js': [ 'browserify' ]
    },

    browsers: (
      isSauce ? Object.keys(customLaunchers) : (
        BROWSERS.match(/\w+/g) ||
        [ 'Chrome', 'Safari', 'PhantomJS' ]
      )
    ),

    reporters: (
      isSauce ? ['progress', 'saucelabs'] : ['progress']
    ),

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
