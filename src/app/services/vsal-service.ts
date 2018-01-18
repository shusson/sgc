import { Injectable } from '@angular/core';
import * as Raven from 'raven-js';
import { constants } from '../app.constants';
import { Variant } from '../model/variant';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { SearchQuery } from '../model/search-query';
import { VariantRequest } from '../model/variant-request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export const VSAL_VARIANT_LIMIT = 10000;
export const VSAL_TIMEOUT = 60000;

@Injectable()
export class VsalService {

    constructor(private http: HttpClient) {

    }
    getVariantsWithAnnotations(query: SearchQuery, limit: number, skip: number, sortBy = 'start', descending = false): Observable<VariantRequest> {
        const params = this.getParams(query)
            .append('sortBy', sortBy)
            .append('descend', descending.toString())
            .append('limit', limit.toString())
            .append('skip', skip.toString())
            .append('annot', 'true');

        return this.getVariants(params);
    }

    getVariantsWithCount(query: SearchQuery): Observable<VariantRequest> {
        const params = this.getParams(query)
            .append('limit', VSAL_VARIANT_LIMIT.toString())
            .append('count', 'true');
        return this.getVariants(params);

    }

    private getParams(query: SearchQuery): HttpParams {
        return new HttpParams()
            .append('chr', query.chromosome)
            .append('start', String(query.start))
            .append('end', String(query.end));
    }

    private getVariants(params: HttpParams): Observable<VariantRequest> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', '*/*');
        return this.request(params, headers);
    }

    private request(params: HttpParams, headers: HttpHeaders): Observable<VariantRequest> {
        return this.http.get(environment.vsalUrl, {params: params, headers: headers})
            .timeout(VSAL_TIMEOUT)
            .map((data) => {
                if (data['error']) {
                    Raven.captureMessage("VSAL ERROR: " + data['error']);
                    return new VariantRequest([], constants.GENERIC_SERVICE_ERROR_MESSAGE);
                }
                const vs = new VariantRequest(data['variants']);
                if (data['total'] && data['total'] !== -1) {
                    vs.total = data['total'];
                }
                return vs;
            })
            .catch((e) => {
                Raven.captureMessage("VSAL ERROR: " + JSON.stringify(e));
                return Observable.of(new VariantRequest([], constants.GENERIC_SERVICE_ERROR_MESSAGE));
            });
    }
}

