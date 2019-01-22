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
    vsalUrl: 'https://sgc.garvan.org.au/ssvs/query',
    elasticUrl: 'https://dr-sgc.kccg.garvan.org.au/_elasticsearch',
    durlUrl: 'https://wt-ec1ac815dce38c76c2e7662693b82189-0.run.webtask.io/durl',
    sentryUrl: 'https://4126e3ee842b4f079400ccf84980e84e@sentry.io/158608',
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
