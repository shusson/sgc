export const environment = {
    production: true,
    ci: false,
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
    sentryUrl: 'https://0a67187927c24ee49ba301bb38c3ed2a@sentry.io/1471904',
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
