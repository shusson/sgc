import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Beacon } from '../../model/beacon';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { MGRB_ID } from './beacon-search-service';
import { Subject } from 'rxjs/Subject';

const TIMEOUT = 20000;

const SUPPORTED_REFERENCES = new Set(['HG19', 'GRCH37']);

export class NetworkBeacon {
    id: string;
    name: string;
    organization: string;
    supportedReferences: string[];
    aggregator: boolean;
    enabled: boolean;
    visible: boolean;
}

export class NetworkOrganization {
    id: string;
    name: string;
    url: string;
    logo: string;
}

export class BeaconResponse {
    beacon: NetworkBeacon;
    query: Beacon;
    response: boolean;
    error: string;
}

export type BeaconId = string;

@Injectable()
export class BeaconNetworkService {
    orgs: NetworkOrganization[];
    supported: Observable<NetworkBeacon[]> = this.getSupportedBeacons();

    constructor(private http: Http) {
        this.getOrganisations().subscribe((o) => {
            this.orgs = o;
        });
    }

    getSupportedBeacons(): Observable<NetworkBeacon[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', '*/*');
        return this.http.get(`${ environment.beaconNetworkUrl }/beacons`, {headers: headers})
            .timeout(TIMEOUT)
            .catch(this.handleError)
            .map((r: Response) => {
                return r.json().filter((v: NetworkBeacon) => {
                    let intersection = v.supportedReferences.filter(x => SUPPORTED_REFERENCES.has(x));
                    return intersection.length > 0 && !v.aggregator && v.id !== MGRB_ID;
                });
            });
    }

    getOrganisation(id: string): Observable<NetworkOrganization> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', '*/*');
        return this.http.get(`${ environment.beaconNetworkUrl }/organizations/${ id }`, {headers: headers})
            .timeout(TIMEOUT)
            .catch(this.handleError)
            .map((r: Response) => {
                return r.json();
            });
    }

    getOrganisations(): Observable<NetworkOrganization[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', '*/*');
        return this.http.get(`${ environment.beaconNetworkUrl }/organizations`, {headers: headers})
            .timeout(TIMEOUT)
            .catch(this.handleError)
            .map(r => r.json());
    }

    queryBeacons(ids: string[], beacon: Beacon): Observable<BeaconResponse[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', '*/*');
        let searchParams = beacon.getSearchParams();
        searchParams.append('beacon', `[${ ids.toString() }]`);
        return this.http.get(`${ environment.beaconNetworkUrl }/responses`, {headers: headers, search: searchParams})
            .timeout(TIMEOUT)
            .catch(this.handleError)
            .map((response: Response) => {
                return response.json().map(this.parseBeacon);
            });
    }

    queryBeacon(id: string, beacon: Beacon): Observable<BeaconResponse> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', '*/*');
        let searchParams = beacon.getSearchParams();
        return this.http.get(`${ environment.beaconNetworkUrl }/responses/${ id }`, {
            headers: headers,
            search: searchParams
        })
            .timeout(TIMEOUT)
            .map((response: Response) => {
                return this.parseBeacon(response.json());
            });
    }

    private handleError() {
        return Observable.throw('An error occurred while trying to connect to the Beacon Network');
    }

    private parseBeacon(v: any): BeaconResponse {
        let result = new BeaconResponse();
        result.beacon = v.beacon;
        result.query = new Beacon(v.query);
        result.response = v.response;
        return result;
    }
}
