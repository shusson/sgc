import { Injectable, EventEmitter } from '@angular/core';
import { QueryResponse, NetworkOrganization, BeaconNetworkService, NetworkBeacon } from './beacon-network-service';
import { Beacon } from '../../model/beacon';

const REFERENCE = 'HG19';
export const MGRB_ID = 'garvan';
const STEP = 1;

export class BeaconCache {
    idMap = new Map<string, BeaconAsyncResult>();
    responses: BeaconAsyncResult[] = [];
    beaconQuery: Beacon;
}

@Injectable()
export class BeaconSearchService {
    errors = new EventEmitter();
    private searches = new Map<string, BeaconCache>();
    private organizations: NetworkOrganization[] = [];
    private supportedBeacons: any;

    constructor(private beaconNetworkService: BeaconNetworkService) {
        this.beaconNetworkService.getOrganisations().then(v => {
            this.organizations = v;
            Array.from(<Iterable<BeaconCache>>this.searches.values()).forEach((cacheObject: BeaconCache) => {
                cacheObject.responses.forEach(r => r.loadExtraDetails(this.organizations));
            });
        }).catch(e => {
            this.errors.emit(e);
            this.organizations = [];
        });

        this.supportedBeacons = this.beaconNetworkService.getSupportedBeacons()
            .catch(e => {
                this.errors.emit(e);
                return Promise.resolve([]);
            });
    }

    searchBeacon(query: string, useCache = true): BeaconCache {
        let beacon = this.parseQuery(query);
        if (!beacon) {
            this.errors.emit(`Could not parse query: ${ query }`);
            return new BeaconCache();
        }

        if (this.searches.has(query) && useCache) {
            let cache = this.searches.get(query);
            this.retryFailedResults(cache, beacon);
            return cache;
        }

        let cache = new BeaconCache();
        this.searches.set(query, cache);
        cache.responses = [];
        cache.idMap.clear();

        this.queryBeaconNetwork(cache, beacon);

        return cache;
    }

    private queryBeaconNetwork(cache: BeaconCache, beacon: Beacon) {
        return this.supportedBeacons.then((beacons: NetworkBeacon[]) => {
            let beaconIds = [MGRB_ID].concat(beacons.map((v) => v.id));

            for (let i = 0; i < beaconIds.length; i += STEP) {
                let idRange = beaconIds.slice(i, i + STEP);
                idRange.forEach(id => {
                    let asyncResult = new BeaconAsyncResult(id);
                    cache.idMap.set(id, asyncResult);
                    cache.responses.push(asyncResult);
                });

                this.beaconNetworkService.queryBeacons(idRange, beacon)
                    .then((queryResponses: QueryResponse[]) => {
                        queryResponses.forEach((v: QueryResponse) => {
                            cache.idMap.get(v.beacon.id).setResult(v, this.organizations);
                        });
                    })
                    .catch(e => {
                        idRange.forEach(id => {
                            let asyncQuery = cache.idMap.get(id);
                            asyncQuery.setFailed();
                        });
                    });
            }
        })
            .catch((e: any) => this.errors.emit(e));
    }

    private parseQuery(query: string): Beacon {
        let results = /^\s*([\dxXyY]+)\s*:\s*(\d+)\s*([ACGTDI]*)\s*>\s*([ACGTDI]+)\s*$/.exec(query);
        if (!results) {
            return null;
        }
        let beacon = new Beacon({});
        beacon.chromosome = results[1];
        beacon.position = results[2];
        beacon.allele = results[4];
        beacon.reference = REFERENCE;
        return beacon;
    }

    private retryFailedResults(result: BeaconCache, beacon: Beacon) {
        result.responses.forEach((a: BeaconAsyncResult) => {
            if (a.error) {
                a.loading = true;
                this.beaconNetworkService.queryBeacons([a.id], beacon)
                    .then((queryResponses: QueryResponse[]) => {
                        queryResponses.forEach((v: QueryResponse) => {
                            result.idMap.get(v.beacon.id).setResult(v, this.organizations);
                        });
                    });
            }
        });
    }
}

export class BeaconAsyncResult {
    loading = true;
    result: QueryResponse;
    error = '';
    displayUrl = '';

    constructor(public id: string) {
    }

    setResult(result: QueryResponse, organizations: NetworkOrganization[]) {
        this.result = result;
        this.loading = false;
        this.error = '';
        this.loadExtraDetails(organizations);
    }

    setFailed() {
        this.result = null;
        this.loading = false;
        this.error = 'Failed';
    }

    loadExtraDetails(organizations: NetworkOrganization[]) {
        this.displayUrl = this.findDisplayUrl(organizations);
    }

    displayResult() {
        if (this.result) {
            if (this.result.response === null) {
                return 'N/A';
            } else {
                return this.result.response.toString();
            }
        } else {
            return this.error;
        }
    }

    private findDisplayUrl(organizations: NetworkOrganization[]) {
        // TODO: optimize
        if (this.result) {
            let org = organizations.find((o: NetworkOrganization) => {
                return o.name === this.result.beacon.organization;
            });
            return org ? org.url : '';
        } else {
            return '';
        }
    }
}

