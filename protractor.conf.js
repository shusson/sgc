const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        './e2e/**/*spec.ts'
    ],
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['--no-sandbox', '--user-data-dir=/tmp']
        }
    },
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },
    beforeLaunch: function() {
        require('ts-node').register({
            project: 'e2e/tsconfig.e2e.json'
        });
    },
    onPrepare: function () {
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    }
};
