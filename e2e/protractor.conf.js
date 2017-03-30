exports.config = {

    allScriptsTimeout: 10000,

    specs: [
        'about.js',
        'initiatives.js',
        'main.js'
    ],

    // specs: [
    //     '*.js'
    // ],

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['--no-sandbox', '--user-data-dir=/tmp']
        }
    },

    baseUrl: 'http://localhost:5013',

    framework: 'jasmine',

    // directConnect: true,

    jasmineNodeOpts: {
        defaultTimeoutInterval: 20000
    },

    useAllAngular2AppRoots: true
};
