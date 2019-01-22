// The file for the current environment will overwrite this one during build.
// Different environments can be found in ./environment.{dev|prod}.ts, and
// you can create your own and use it with the --env flag.
// The build system defaults to the dev environment.

export class MapDSettings {
    protocol = '';
    host = '';
    port = '';
    dbName = '';
    user = '';
    pwd = '';
}

export const environment = {
    production: false,
    ci: false,
    ensemblDomain: '',
    ensemblProtocol: 'https',
    baseHref: '',
    auth0ClientId: '',
    auth0Domain: '',
    auth0Connection: '',
    beaconNetworkUrl: '',
    vsalUrl: '',
    elasticUrl: '',
    durlUrl: '',
    sentryUrl: '',
    clinicalUrl: '',
    mapd: new MapDSettings(),
};
