export const environment = {
    production: true,
    ci: false,
    ensemblDomain: 'grch37.rest.ensembl.org',
    ensemblProtocol: 'https',
    baseHref: '',
    auth0ClientId: 'KLhFZDgUFeUyO6CnslMoGAoQ1lV0uWzM',
    auth0Domain: 'sgc.au.auth0.com',
    auth0Connection: 'Production',
    beaconNetworkUrl: 'https://beacon-network.org/api',
    vsalUrl: 'https://vsal.garvan.org.au/ssvs/mgrb/query',
    elasticUrl: 'https://dr-sgc.kccg.garvan.org.au/_elasticsearch',
    durlUrl: 'https://wt-ec1ac815dce38c76c2e7662693b82189-0.run.webtask.io/durl',
    sentryUrl: 'https://6d4633523e614c36a0ba2a92358ab4cc@sentry.io/1471908',
    clinicalUrl: 'http://localhost:3000',
    mapd: {
        protocol: 'https',
        host: 'vsal.garvan.org.au',
        port: '443/mgrb',
        dbName: 'mapd',
        user: 'mapd',
        pwd: 'HyperInteractive',
    }
};
