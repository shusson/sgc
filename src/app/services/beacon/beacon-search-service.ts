import { Injectable, EventEmitter } from '@angular/core';
import {
    BeaconResponse, NetworkOrganization, BeaconNetworkService, NetworkBeacon,
    BeaconId
} from './beacon-network-service';
import { Beacon } from '../../model/beacon';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

const REFERENCE = 'HG19';
export const MGRB_ID = 'garvan';
const QUERY_LIMIT = 6; // limit of concurrent requests in most browsers

export class BeaconCache {

    responses: BeaconAsyncResult[] = [];
    error = false;
    queue = new Subject<BeaconId>();
    results: Observable<BeaconResponse>;
    private buffered = new Subject<BeaconId>();
    private buffer = [];
    private idMap = new Map<BeaconId, BeaconAsyncResult>();
    private pending = 0;
    private found = 0;
    private notFound = 0;
    private failed = 0;

    constructor(private beacon: Beacon,
                private bns: BeaconNetworkService) {
        this.results = this.buffered
            .debounceTime(100)
            .mergeMap(() => {
                let obs = [];
                while (this.pending <= QUERY_LIMIT && this.buffer.length > 0) {
                    this.pending++;
                    let id = this.buffer.shift();
                    obs.push(this.bns.queryBeacon(id, this.beacon)
                        .catch(e => {
                            let br = new BeaconResponse();
                            br.beacon = new NetworkBeacon();
                            br.beacon.id = id;
                            br.error = 'error: ' + JSON.stringify(e);
                            return Observable.of(br);
                        })
                        .map(b => {
                            return b;
                        }));
                }
                return Observable.merge(...obs);
            }).share();

        this.queue.subscribe((id) => {
            this.buffer.push(id);
            this.buffered.next();
        });

        this.results.subscribe(
            (v: BeaconResponse) => {
                this.pending--;
                this.buffered.next();
                if (v.error) {
                    this.idMap.get(v.beacon.id).setFailed();
                    this.failed++;
                } else {
                    this.idMap.get(v.beacon.id).setResult(v);
                    v.response ? this.found++ : this.notFound--;
                }
            },
            (e: any) => {
                this.error = true;
            }
        );
    }

    addBeacon(id: BeaconId) {
        let asyncResult = new BeaconAsyncResult(id, this.beacon, this.bns);
        this.idMap.set(id, asyncResult);
        this.responses.push(asyncResult);
        this.queue.next(id);
    }

    loadingCount() {
        return this.pending;
    }

    foundCount() {
        return this.found;
    }

    foundResponses() {
        return this.responses.filter(b => b.result && b.result.response);
    }

    retryFailedResults() {
        this.responses.forEach((a: BeaconAsyncResult) => {
            if (a.error) {
                this.queue.next(a.id);
            }
        });
    }

}

@Injectable()
export class BeaconSearchService {
    errors = new EventEmitter();
    private searches = new Map<string, BeaconCache>();

    constructor(private bns: BeaconNetworkService) {
    }

    searchBeacon(query: string, useCache = true): BeaconCache {
        let beacon = this.parseQuery(query);
        if (!beacon) {
            this.errors.emit(`Could not parse query: ${ query }`);
            return new BeaconCache(beacon, this.bns);
        }

        if (this.searches.has(query) && useCache) {
            let cache = this.searches.get(query);
            cache.retryFailedResults();
            return cache;
        }

        let cache = new BeaconCache(beacon, this.bns);
        this.searches.set(query, cache);
        this.queryBeaconNetwork(cache);

        return cache;
    }

    private queryBeaconNetwork(cache: BeaconCache) {
        this.bns.supported.subscribe(
            (beacons: NetworkBeacon[]) => {
                let beaconIds = [MGRB_ID].concat(beacons.map((v) => v.id));
                beaconIds.forEach((id) => {
                    cache.addBeacon(id);
                });
            },
            (e) => {
                this.errors.emit(e);
            });
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
}

export class BeaconAsyncResult {
    loading = true;
    result: BeaconResponse;
    error = '';
    displayUrl: Observable<string>;

    constructor(public id: string,
                public beacon: Beacon,
                private bns: BeaconNetworkService) {
    }

    setFailed() {
        this.result = null;
        this.loading = false;
        this.error = 'Failed';
    }

    setResult(result: BeaconResponse) {
        this.result = result;
        this.loading = false;
        this.error = '';
        this.displayUrl = this.getDisplayUrl();
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

    private getDisplayUrl() {
        if (this.result) {
            return this.bns.orgs.map((organizations) => {
                let org = organizations.find((o: NetworkOrganization) => {
                    return o.name === this.result.beacon.organization;
                });
                return org ? org.url : '';
            });
        }
        return Observable.of('');
    }
}

