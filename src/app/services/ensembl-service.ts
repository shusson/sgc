import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const TIMEOUT = 10000;
const CHROMOSOME_URL = '/info/assembly/human/1';
const HEALTH_CHECK_URL = `${ environment.ensemblProtocol }://${ environment.ensemblDomain }${ CHROMOSOME_URL }`;

@Injectable()
export class EnsemblService {
    constructor(private http: Http) {}

    healthCheck(): Promise<boolean> {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return this.http.get(HEALTH_CHECK_URL, {headers: headers})
            .timeout(TIMEOUT)
            .map((response: Response) => {
                if (!response.ok) {
                    throw new Error();
                }
            })
            .catch(() => {
                return Observable.throw('Ensembl health check failed');
            })
            .toPromise();
    }

    getGenesInRegion(region: string): Observable<any> {
        let headers = new Headers();
        let params = new URLSearchParams();
        params.set('feature', 'gene');
        headers.append('Accept', 'application/json');
        let ensemblBaseUrl = `${ environment.ensemblProtocol }://${ environment.ensemblDomain }`;
        let url = `${ ensemblBaseUrl }/overlap/region/human/${ region }`;
        return this.http.get(url, {headers: headers, search: params})
            .timeout(TIMEOUT)
            .catch(() => {
                return Observable.throw('An error occurred while trying to connect to ensembl');
            });
    }
}
