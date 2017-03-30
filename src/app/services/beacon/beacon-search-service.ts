import { Injectable, EventEmitter } from '@angular/core';
import { QueryResponse, NetworkOrganization, BeaconNetworkService, NetworkBeacon } from './beacon-network-service';
import { Beacon } from '../../model/beacon';

const REFERENCE = 'HG19';
export const MGRB_ID = 'garvan';
const STEP = 1;

class CacheObject {
    idMap = new Map<string, AsyncResult>();
    responses: AsyncResult[] = [];
    beaconQuery: Beacon;
}

@Injectable()
export class BeaconSearchService {
    errors = new EventEmitter();
    private resultCache = new Map<string, CacheObject>();
    private organizations: NetworkOrganization[] = [];
    private supportedBeacons: any;

    constructor(private beaconNetworkService: BeaconNetworkService) {
        this.beaconNetworkService.getOrganisations().then(v => {
            this.organizations = v;
            Array.from(<Iterable<CacheObject>>this.resultCache.values()).forEach((cacheObject: CacheObject) => {
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

    searchBeacon(query: string, useCache = true): CacheObject {
        let beacon = this.parseQuery(query);
        if (!beacon) {
            this.errors.emit(`Could not parse query: ${ query }`);
            return new CacheObject();
        }

        if (this.resultCache.has(query) && useCache) {
            let cachedResult = this.resultCache.get(query);
            this.retryFailedResults(cachedResult, beacon);
            return cachedResult;
        }

        let cachedResult = new CacheObject();
        this.resultCache.set(query, cachedResult);
        cachedResult.responses = [];
        cachedResult.idMap.clear();

        this.queryBeaconNetwork(cachedResult, beacon);

        return cachedResult;
    }

    private queryBeaconNetwork(cachedResult: CacheObject, beacon: Beacon) {
        return this.supportedBeacons.then((beacons: NetworkBeacon[]) => {
            let beaconIds = [MGRB_ID].concat(beacons.map((v) => v.id));

            for (let i = 0; i < beaconIds.length; i += STEP) {
                let idRange = beaconIds.slice(i, i + STEP);
                idRange.forEach(id => {
                    let asyncResult = new AsyncResult(id);
                    cachedResult.idMap.set(id, asyncResult);
                    cachedResult.responses.push(asyncResult);
                });

                this.beaconNetworkService.queryBeacons(idRange, beacon)
                    .then((queryResponses: QueryResponse[]) => {
                        queryResponses.forEach((v: QueryResponse) => {
                            cachedResult.idMap.get(v.beacon.id).setResult(v, this.organizations);
                        });
                    })
                    .catch(e => {
                        idRange.forEach(id => {
                            let asyncQuery = cachedResult.idMap.get(id);
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

    private retryFailedResults(result: CacheObject, beacon: Beacon) {
        result.responses.forEach((a: AsyncResult) => {
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

export class AsyncResult {
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

