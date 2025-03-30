import { Injectable } from '@angular/core';
import { Beacon } from '../../model/beacon';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from "rxjs";

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
        }, e => {
            this.orgs = [];
        });
    }

    getSupportedBeacons(): Observable<NetworkBeacon[]> {
        return this.http.get(`${ environment.beaconNetworkUrl }/beacons`)
            .timeout(TIMEOUT)
            .catch(this.handleError)
            .map((data: any) => {
                return data.filter((v: NetworkBeacon) => {
                    const intersection = v.supportedReferences.filter(x => SUPPORTED_REFERENCES.has(x));
                    return intersection.length > 0 && !v.aggregator && v.id !== MGRB_ID;
                });
            });
    }

    getOrganisations(): Observable<NetworkOrganization[]> {
        return this.http.get<any>(`${ environment.beaconNetworkUrl }/organizations`)
            .timeout(TIMEOUT)
            .catch(this.handleError);
    }

    queryBeacon(id: string, beacon: Beacon): Observable<BeaconResponse> {
        const searchParams = beacon.getSearchParams();
        return this.http.get(`${ environment.beaconNetworkUrl }/responses/${ id }`, {
            params: searchParams
        })
            .timeout(TIMEOUT)
            .map(data => {
                return this.parseBeacon(data);
            });
    }

    private handleError() {
        return throwError('An error occurred while trying to connect to the Beacon Network');
    }

    private parseBeacon(v: any): BeaconResponse {
        const result = new BeaconResponse();
        result.beacon = v.beacon;
        result.query = new Beacon(v.query);
        result.response = v.response;
        return result;
    }
}
