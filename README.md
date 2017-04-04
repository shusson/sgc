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

Alternatively run the tests with the help of docker ([macOS issue](https://forums.docker.com/t/access-host-not-vm-from-inside-container/11747/10)):

 Build dist directory
 ```bash
 ng build --target=production --environment=staging --aot
 ```

 Start docker nginx test server and host dist directory and use config in e2e directory
 ```bash
 docker run --volume $(pwd):/usr/share/nginx/html --volume $(pwd)/e2e:/etc/nginx --detach --name sgc -p 5013:80 nginx:latest
 ```

 Run containerized protractor tests using [shusson/chrome-tester](https://github.com/shusson/docker-chrome-headless) 
 ```bash
 docker run -it --privileged --rm --net=host -v /dev/shm:/dev/shm -v $(pwd)/e2e:/tests shusson/chrome-tester protractor
 ```

### External services
The application connects to a number of external services, 
all of which are defined in [src/environments](src/environments). 
   
#### VSAL
Garvan's variant store abstraction layer. Source code is not currently 
available.

#### [DURL](https://github.com/shusson/durl)
A simple webtask for generating an s3 presigned url. 
Used for downloading VCFs that require minimal authentication.
 
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

### Acknowledgements
Special thanks to [Miguel Pignatelli](https://github.com/emepyc) 
for his help with the [tnt genome browser](https://github.com/tntvis/tnt.genome).
