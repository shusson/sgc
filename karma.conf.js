// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        singleRun: true,
        files: [
            "node_modules/hammerjs/hammer.min.js",
            { pattern: './node_modules/@angular/material/prebuilt-themes/indigo-pink.css' },
            
        ],
        
        captureTimeout: 60000,
        browserDisconnectTolerance: 3,
        browserDisconnectTimeout : 60000,
        browserNoActivityTimeout : 60000,
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['ChromeHeadless']
    });
};
