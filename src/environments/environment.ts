// The file for the current environment will overwrite this one during build.
// Different environments can be found in ./environment.{dev|prod}.ts, and
// you can create your own and use it with the --env flag.
// The build system defaults to the dev environment.

import { MapDSettings } from '../app/services/mapd.service';

export const environment = {
    production: false,
    ensemblDomain: '',
    ensemblProtocol: 'https',
    baseHref: '',
    auth0ClientId: '',
    auth0Domain: '',
    beaconNetworkUrl: '',
    vsalUrl: '',
    elasticUrl: '',
    durlUrl: '',
    sentryUrl: '',
    mapd: new MapDSettings()
};
