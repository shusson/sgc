export const environment = {
    production: true,
    ci: true,
    ensemblDomain: 'grch37.rest.ensembl.org',
    ensemblProtocol: 'https',
    baseHref: '',
    auth0ClientId: 'eS2HA6aSYnxCXFvo9bzHpV1DI6H1yw0l',
    auth0Domain: 'sgc.au.auth0.com',
    auth0Connection: 'Username-Password-Authentication',
    beaconNetworkUrl: 'https://beacon-network.org/api',
    vsalUrl: 'https://sgc.garvan.org.au/ssvs/query',
    elasticUrl: 'https://dr-sgc.kccg.garvan.org.au/_elasticsearch',
    durlUrl: 'https://wt-ec1ac815dce38c76c2e7662693b82189-0.run.webtask.io/durl-dev',
    sentryUrl: 'https://90b2013bdfef4fef9491990e6ad379c6@sentry.io/158605',
    clinicalUrl: 'http://localhost:3000',
    mapd: {
        protocol: 'https',
        host: 'mapd.vectis-api.com',
        port: '443',
        dbName: 'mapd',
        user: 'mapd',
        pwd: 'HyperInteractive',
    }
};
