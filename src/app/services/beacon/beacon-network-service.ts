import { Injectable } from '@angular/core';
import { Beacon } from '../../model/beacon';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const TIMEOUT = 20000;

const SUPPORTED_REFERENCES = new Set(['HG19', 'GRCH37']);
const MGRB_ID = 'garvan';

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

    constructor(private http: HttpClient) {
        this.getOrganisations().subscribe((o) => {
            this.orgs = o;
        });
    }

    getSupportedBeacons(): Observable<NetworkBeacon[]> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', '*/*');
        return this.http.get(`${ environment.beaconNetworkUrl }/beacons`, {headers: headers})
            .timeout(TIMEOUT)
            .catch(this.handleError)
            .map((data) => {
                return data.filter((v: NetworkBeacon) => {
                    const intersection = v.supportedReferences.filter(x => SUPPORTED_REFERENCES.has(x));
                    return intersection.length > 0 && !v.aggregator && v.id !== MGRB_ID;
                });
            });
    }

    getOrganisation(id: string): Observable<NetworkOrganization> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', '*/*');
        return this.http.get(`${ environment.beaconNetworkUrl }/organizations/${ id }`, {headers: headers})
            .timeout(TIMEOUT)
            .catch(this.handleError);
    }

    getOrganisations(): Observable<NetworkOrganization[]> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', '*/*');
        return this.http.get(`${ environment.beaconNetworkUrl }/organizations`, {headers: headers})
            .timeout(TIMEOUT)
            .catch(this.handleError);
    }

    queryBeacons(ids: string[], beacon: Beacon): Observable<BeaconResponse[]> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', '*/*');
        const params = beacon.getSearchParams()
            .append('beacon', `[${ ids.toString() }]`);
        return this.http.get(`${ environment.beaconNetworkUrl }/responses`, {headers: headers, params: params})
            .timeout(TIMEOUT)
            .catch(this.handleError)
            .map(data => {
                return data.map(this.parseBeacon);
            });
    }

    queryBeacon(id: string, beacon: Beacon): Observable<BeaconResponse> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', '*/*');
        const searchParams = beacon.getSearchParams();
        return this.http.get(`${ environment.beaconNetworkUrl }/responses/${ id }`, {
            headers: headers,
            params: searchParams
        })
            .timeout(TIMEOUT)
            .map(data => {
                return this.parseBeacon(data);
            });
    }

    private handleError() {
        return Observable.throw('An error occurred while trying to connect to the Beacon Network');
    }

    private parseBeacon(v: any): BeaconResponse {
        const result = new BeaconResponse();
        result.beacon = v.beacon;
        result.query = new Beacon(v.query);
        result.response = v.response;
        return result;
    }
}
