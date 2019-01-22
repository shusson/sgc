import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import {
    BeaconResponse, NetworkOrganization, BeaconNetworkService, NetworkBeacon,
    BeaconId
} from './beacon-network-service';
import { Beacon } from '../../model/beacon';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { of, merge, Observable } from "rxjs";

const REFERENCE = 'HG19';
const MGRB_ID = 'garvan';
const QUERY_LIMIT = 6; // limit of concurrent requests in most browsers

export class BeaconCache {

    responses: BeaconAsyncResult[] = [];
    error = false;
    queue = new Subject<BeaconId>();
    results: Observable<BeaconResponse>;
    private loading = true;
    private buffered = new Subject<BeaconId>();
    private buffer = [];
    private idMap = new Map<BeaconId, BeaconAsyncResult>();
    private pending = 0;
    private found = 0;
    private notFound = 0;
    private failed = 0;
    private subs: Subscription[] = [];

    constructor(private beacon: Beacon,
                private bns: BeaconNetworkService) {
        this.results = this.buffered
            .debounceTime(100)
            .mergeMap(() => {
                const obs = [];
                while (this.pending <= QUERY_LIMIT && this.buffer.length > 0) {
                    this.pending++;
                    const id = this.buffer.shift();
                    if (this.buffer.length <= 0) {
                        this.loading = false;
                        this.responses.forEach(r => r.getDisplayUrl());
                    }
                    obs.push(this.bns.queryBeacon(id, this.beacon)
                        .catch(e => {
                            const br = new BeaconResponse();
                            br.beacon = new NetworkBeacon();
                            br.beacon.id = id;
                            br.error = 'error: ' + JSON.stringify(e);
                            return of<BeaconResponse>(br);
                        })
                        .map(b => {
                            return b;
                        }));
                }
                return merge<BeaconResponse>(...obs);
            }).share();

        this.subs.push(this.queue.subscribe((id) => {
            this.loading = true;
            this.buffer.push(id);
            this.buffered.next();
        }));

        this.subs.push(this.results.subscribe(
            (v: BeaconResponse) => {
                this.pending--;
                this.buffered.next();
                if (v.error) {
                    this.idMap.get(v.beacon.id).setFailed();
                    this.failed++;
                } else {
                    this.idMap.get(v.beacon.id).setResult(v);
                    v.response ? this.found++ : this.notFound++;
                }
            },
            (e: any) => {
                this.error = true;
            }
        ));
    }

    addBeacon(id: BeaconId) {
        const asyncResult = new BeaconAsyncResult(id, this.beacon, this.bns);
        this.idMap.set(id, asyncResult);
        this.responses.push(asyncResult);
        this.queue.next(id);
    }

    isLoading() {
        return this.loading;
    }

    foundCount() {
        return this.found;
    }

    foundResponses() {
        return this.responses.filter(b => b.result && b.result.response);
    }

    resolvedResponses() {
        return this.responses.filter(b => !b.loading);
    }

    unsubscribe() {
        this.subs.forEach(s => s.unsubscribe());
    }

    totalCount() {
        return this.responses.length;
    }

    totalProcessed() {
        return this.found + this.notFound + this.failed;
    }

    percentComplete() {
        return (this.totalProcessed() / this.responses.length) * 100;
    }

}

@Injectable()
export class BeaconSearchService implements OnDestroy {
    errors = new EventEmitter();
    private cache: BeaconCache;

    constructor(private bns: BeaconNetworkService) {
    }

    searchBeacon(query: string, useCache = true): BeaconCache {
        const beacon = this.parseQuery(query);
        if (!beacon) {
            this.errors.emit(`Could not parse query: ${ query }`);
            return new BeaconCache(beacon, this.bns);
        }
        if (this.cache) {
            this.cache.unsubscribe();
        }
        this.cache = new BeaconCache(beacon, this.bns);
        this.bns.supported.subscribe(
            (beacons: NetworkBeacon[]) => {
                const beaconIds = [MGRB_ID].concat(beacons.map((v) => v.id));
                beaconIds.forEach((id) => {
                    this.cache.addBeacon(id);
                });
            },
            (e) => {
                this.errors.emit(e);
            });

        return this.cache;
    }

    private parseQuery(query: string): Beacon {
        const results = /^\s*([\dxXyY]+)\s*:\s*(\d+)\s*([ACGTDI]*)\s*>\s*([ACGTDI]+)\s*$/.exec(query);
        if (!results) {
            return null;
        }
        const beacon = new Beacon({});
        beacon.chromosome = results[1];
        beacon.position = results[2];
        beacon.allele = results[4];
        beacon.reference = REFERENCE;
        return beacon;
    }

    ngOnDestroy() {
        if (this.cache) {
            this.cache.unsubscribe();
        }

    }
}

export class BeaconAsyncResult {
    loading = true;
    result: BeaconResponse;
    displayResult: string;
    error = '';
    orgUrl: string;

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
        this.displayResult = this.getDisplayResult();
        this.loading = false;
        this.error = '';
        this.getDisplayUrl();
    }

    private getDisplayResult() {
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

    getDisplayUrl() {
        if (this.result && this.bns.orgs) {
            const org = this.bns.orgs.find((o: NetworkOrganization) => {
                return o.name === this.result.beacon.organization;
            });
            this.orgUrl = org ? org.url : '';
        }
    }
}

