export const environment = {
    production: false,
    ensemblDomain: 'grch37.rest.ensembl.org',
    ensemblProtocol: 'http',
    baseHref: '',
    auth0ClientId: 'eS2HA6aSYnxCXFvo9bzHpV1DI6H1yw0l',
    auth0Domain: 'sgc.au.auth0.com',
    beaconNetworkUrl: 'https://beacon-network.org/api',
    // vsalUrl: 'http://localhost:3000',
    vsalUrl: 'http://129.94.14.221:8080/vsal/core/find',
    // elasticUrl: 'http://localhost:328v40',
    elasticUrl: 'https://dr-sgc.kccg.garvan.org.au/_elasticsearch',
    durlUrl: 'https://wt-ec1ac815dce38c76c2e7662693b82189-0.run.webtask.io/durl-dev',
    sentryUrl: 'https://90b2013bdfef4fef9491990e6ad379c6@sentry.io/158605',
    clinicalUrl: 'http://localhost:3000/data',
    mapd: {
        protocol: 'https',
        host: 'vectis-api.com',
        port: '443',
        dbName: 'mapd',
        user: 'mapd',
        pwd: 'HyperInteractive',
    }
};
