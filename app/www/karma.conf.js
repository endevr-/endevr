// Karma configuration
// Generated on Sat Nov 08 2014 23:26:46 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
    //Angular source
    'lib/ionic/js/ionic.bundle.js',
    
    //Tried using this for a while, but it looks like I need to use the bundled version above.
    //Which kind of makes sense, as that is the file the app itself is using.
    // 'lib/ionic/js/ionic.js',

    //If this file isn't commented, Karma gives a warning that angular tried to load twice.
    // 'lib/ionic/js/angular/angular.js',

    // 'lib/angular-ui-router/release/angular-ui-router.js',
    // 'lib/angular/angular.js',
    'lib/angular-mocks/angular-mocks.js',
    'lib/angular-local-storage/dist/angular-local-storage.js',
    'lib/ngCordova/dist/ng-cordova.js',
    'lib/ionic/js/angular-ui/angular-ui-router.js',
    'lib/angular-animate/angular-animate.js',
    'lib/angular-sanitize/angular-sanitize.js',

    //App code
    'js/*.js',
    'js/controllers/*.js',
    'js/services/*.js',

    //Test files
    'test/*.js',
    'test/controllers/*.js',
    'test/services/*.js'
    ],

    // list of files to exclude
    exclude: [
      'karma.conf.js',
    ],

    coverageReporter: {
          dir: 'test/reports/coverage',
          subdir: '.'
        },

        htmlReporter: {
          outputFile: 'test/reports/passFail.html'
        },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'js/controllers/*.js': 'coverage',
        'js/services/*.js': 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'html'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
