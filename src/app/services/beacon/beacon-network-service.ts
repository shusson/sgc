import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Beacon } from '../../model/beacon';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { MGRB_ID } from './beacon-search-service';

const TIMEOUT = 25000;

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

export class QueryResponse {
    beacon: NetworkBeacon;
    query: Beacon;
    response: boolean;
    error: string;
}

@Injectable()
export class BeaconNetworkService {

    constructor(private http: Http) {
    }

    getSupportedBeacons(): Promise<NetworkBeacon[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', '*/*');
        return this.http.get(`${ environment.beaconNetworkUrl }/beacons`, {headers: headers})
            .timeout(TIMEOUT)
            .catch(this.handleError)
            .toPromise()
            .then((response: Response) => {
                return response.json().filter((v: NetworkBeacon) => {
                    let intersection = v.supportedReferences.filter(x => SUPPORTED_REFERENCES.has(x));
                    return intersection.length > 0 && !v.aggregator && v.id !== MGRB_ID;
                });
            });
    }

    getOrganisation(id: string): Promise<NetworkOrganization> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', '*/*');
        return this.http.get(`${ environment.beaconNetworkUrl }/organizations/${ id }`, {headers: headers})
            .timeout(TIMEOUT)
            .catch(this.handleError)
            .toPromise()
            .then((response: Response) => {
                return response.json();
            });
    }

    getOrganisations(): Promise<NetworkOrganization[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', '*/*');
        return this.http.get(`${ environment.beaconNetworkUrl }/organizations`, {headers: headers})
            .timeout(TIMEOUT)
            .catch(this.handleError)
            .toPromise()
            .then((response: Response) => {
                return response.json();
            });
    }

    queryBeacons(ids: string[], beacon: Beacon): Promise<QueryResponse[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', '*/*');
        let searchParams = beacon.getSearchParams();
        searchParams.append('beacon', `[${ ids.toString() }]`);
        return this.http.get(`${ environment.beaconNetworkUrl }/responses`, {headers: headers, search: searchParams})
            .timeout(TIMEOUT)
            .catch(this.handleError)
            .toPromise()
            .then((response: Response) => {
                return response.json().map((v: any) => {
                    let result = new QueryResponse();
                    result.beacon = v.beacon;
                    result.query = new Beacon(v.query);
                    result.response = v.response;
                    return result;
                });
            });
    }

    private handleError() {
        return Observable.throw('An error occurred while trying to connect to the Beacon Network');
    }
}
