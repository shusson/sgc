import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from "rxjs";

const TIMEOUT = 10000;
const CHROMOSOME_URL = '/info/assembly/human/1';
const HEALTH_CHECK_URL = `${ environment.ensemblProtocol }://${ environment.ensemblDomain }${ CHROMOSOME_URL }`;

@Injectable()
export class EnsemblService {
    constructor(private http: HttpClient) {}

    healthCheck(): Promise<boolean> {
        const headers = new HttpHeaders()
            .append('Accept', 'application/json');
        return this.http.get<any>(HEALTH_CHECK_URL, {headers: headers})
            .timeout(TIMEOUT)
            .catch(() => {
                return throwError('Ensembl health check failed');
            })
            .toPromise();
    }

    getGenesInRegion(region: string): Observable<any> {
        const headers = new HttpHeaders()
            .append('Accept', 'application/json');
        const params = new HttpParams()
            .set('feature', 'gene');

        const ensemblBaseUrl = `${ environment.ensemblProtocol }://${ environment.ensemblDomain }`;
        const url = `${ ensemblBaseUrl }/overlap/region/human/${ region }`;
        return this.http.get(url, {headers: headers, params: params})
            .timeout(TIMEOUT)
            .catch(() => {
                return throwError('An error occurred while trying to connect to ensembl');
            });
    }
}
