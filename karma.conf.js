// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('@angular/cli/plugins/karma')
        ],
        singleRun: true,
        files: [
            "node_modules/hammerjs/hammer.min.js",
            "node_modules/tnt.genome/build/tnt.genome.js",
            { pattern: './node_modules/@angular/material/prebuilt-themes/indigo-pink.css' },
            { pattern: './src/test.ts', watched: false }
        ],
        preprocessors: {
            './src/test.ts': ['@angular/cli']
        },
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        angularCli: {
            config: './.angular-cli.json',
            environment: 'dev'
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS']
    });
};
