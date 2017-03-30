## SYDNEY GENOMICS COLLABORATIVE

An web application for investigating genomic variants.

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

#### structure
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
karma start
```
  
#### e2e tests
 
There are a minimum set of functional tests that check that critical 
features work

Serve the app e.g:
```bash
ng serve --port=5013
```
run the tests
```bash
cd e2e; protractor
```

### External services
The application connects to a number of external services, 
all of which are defined in the [environments](environments). 
   
#### VSAL
Garvan's variant store abstraction layer. Source code is not currently 
available.
 
#### [Elastic Gene Search](https://github.com/shusson/genesearch)
A service for searching for gene information.

#### [Ensembl Rest API](http://rest.ensembl.org/)
Used for genomic reference information.

#### [BeaconNetwork](https://beacon-network.org/)
Used for querying variants across different datasets and organizations.

### Acknowledgements
Special thanks to [Miguel Pignatelli](https://github.com/emepyc) 
for his help with the [tnt genome browser](https://github.com/tntvis/tnt.genome).
