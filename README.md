[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e696a4f2fc9c47f98c7f4e19baddde7c)](https://www.codacy.com/app/shane.a.husson/sgc?utm_source=github.com&utm_medium=referral&utm_content=shusson/sgc&utm_campaign=badger)

## SYDNEY GENOMICS COLLABORATIVE

A web application for exploring population scale genomic studies.

More info: https://sgc.garvan.org.au 

### Development
Built with latest [angular](https://github.com/angular/angular).

We use [angular-cli](https://github.com/angular/angular-cli) for
development. It handles scaffolding, configuration, development hosting 
and more.

#### Prerequisites

 - Node 6.9.0 or higher
 - NPM 3 or higher.

#### Simple Setup

```bash
npm install -g @angular/cli
npm install
ng serve
```

#### Structure
The general structure is scaffolded by angular-cli.

The app src code structure:

```
  -- app
     -- components
        -- pages     // a component that can be directly navigated to by the router
        -- parts     // all the components that make up the pages
     -- mocks        // simple mocks for tests
     -- model        // classes that encapsulate the domain
     -- services     // injectable services that facilitate communication between components
     -- shared       // some shared code
     -- assets       // all the assets for the website (copied to dist on build)
     -- environments // the different environents for build targets
```

### Testing

#### unit tests

To run tests
```bash
ng test
```
  
#### e2e tests
 
There are a minimum set of functional tests that check that critical 
features work

To run tests
```bash
ng e2e
```

### External services
The application connects to a number of external services, 
all of which are defined in [src/environments](src/environments). 
   
#### VSAL
A minimum [variantstore](https://github.com/shusson/variantstore) backed by MySQL
 
#### [Elastic Gene Search](https://github.com/shusson/genesearch)
A service for searching for gene information.

#### [Ensembl Rest API](http://rest.ensembl.org/)
Used for genomic reference information.

#### [BeaconNetwork](https://beacon-network.org/)
Used for querying variants across different datasets and organizations.

#### [Auth0](https://auth0.com/)
Our identity service. Provides identity and authentication.

#### [Sentry](https://sentry.io/)
Tracks any unhandled errors

#### [MapD-API](https://github.com/shusson/mapd-api)
A variant store backed by an in-memory GPU Database [MapD](https://github.com/mapd/mapd-core) that supports cross dimensional charts.

### Deployment

Travis handles our build, testing and deployment. 

We have a CI pipeline set up that hosts on firebase.
See [.travis.yml](.travis.yml) and [deploy](deploy) for more info.

The final production build which is hosted at https://sgc.garvan.org.au 
is still manually deployed.

### Acknowledgements
Special thanks to [Miguel Pignatelli](https://github.com/emepyc) 
for his help with the [tnt genome browser](https://github.com/tntvis/tnt.genome).
