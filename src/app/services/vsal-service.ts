import { Injectable } from '@angular/core';
import { URLSearchParams, Headers, Response, Http } from '@angular/http';
import { Variant } from '../model/variant';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { SearchQuery } from '../model/search-query';
import { VariantRequest } from '../model/variant-request';
import { SearchFilterItem, SearchFilterItemSerialised } from '../model/search-filter-item';

export const VSAL_VARIANT_LIMIT = 500;
export const VSAL_TIMEOUT = 20000;

@Injectable()
export class VsalService {

    private clinicalParamMap: any = {
        'Year Of Birth': (v: SearchFilterItem, p: URLSearchParams) => {
            p.append('yobStart', v.start);
            p.append('yobEnd', v.end);
        },
        'Systolic Blood Pressure': (v: SearchFilterItem, p: URLSearchParams) => {
            p.append('sbpStart', v.start);
            p.append('sbpEnd', v.end);
        },
        'Height': (v: SearchFilterItem, p: URLSearchParams) => {
            p.append('heightStart', v.start);
            p.append('heightEnd', v.end);
        },
        'Weight': (v: SearchFilterItem, p: URLSearchParams) => {
            p.append('weightStart', v.start);
            p.append('weightEnd', v.end);
        },
        'Abdominal Circumference': (v: SearchFilterItem, p: URLSearchParams) => {
            p.append('abdCircStart', v.start);
            p.append('abdCircEnd', v.end);
        },
        'Glucose': (v: SearchFilterItem, p: URLSearchParams) => {
            p.append('glcStart', v.start);
            p.append('glcEnd', v.end);
        },
        'Gender': (v: SearchFilterItem, p: URLSearchParams) => {
            p.append('gender', v.start);
        },
    };

    constructor(private http: Http) {
    }

    getVariants(query: SearchQuery): Observable<VariantRequest> {
        let urlParams = new URLSearchParams();
        urlParams.append('chromosome', query.chromosome);
        urlParams.append('positionStart', String(query.start));
        urlParams.append('positionEnd', String(query.end));
        urlParams.append('limit', VSAL_VARIANT_LIMIT.toString());

        query.options.forEach(o => {
            if (o.key) {
                urlParams.append(o.key, o.getValue());
            }
        });

        query.clinicalFilters.forEach((v: SearchFilterItemSerialised) => {
            this.clinicalParamMap[v.name](v, urlParams);
        });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', '*/*');
        return this.requests(urlParams, headers).reduce((acc: VariantRequest, x: VariantRequest, i: number) => {
            acc.variants = acc.variants.concat(x.variants);
            acc.error += x.error;
            return acc;
        }, new VariantRequest([])).map((v: VariantRequest) => {
            v.variants.sort((a: Variant, b: Variant) => a.start - b.start);
            return v;
        });
    }

    private requests(params: URLSearchParams, headers: Headers): Observable<VariantRequest> {
        params.append('count', 'true');
        return Observable.create((observer) => {
            this.request(params, headers).subscribe((vs: VariantRequest) => {
                observer.next(vs);
                if (vs.error) {
                    observer.complete();
                } else {
                    if (vs.total > VSAL_VARIANT_LIMIT) {
                        let i: number;
                        let completed = 0;
                        let queued = Math.floor(vs.total / VSAL_VARIANT_LIMIT);
                        for (i = VSAL_VARIANT_LIMIT; i < vs.total; i += VSAL_VARIANT_LIMIT) {
                            params.set('skip', String(i));
                            this.request(params, headers).subscribe((svs: VariantRequest) => {
                                observer.next(svs);
                                completed++;
                                if (completed === queued || svs.error) {
                                    observer.complete();
                                }
                            });
                        }
                    } else {
                        observer.complete();
                    }
                }
            });
        });
    }

    private request(params: URLSearchParams, headers: Headers): Observable<VariantRequest> {
        return this.http.get(environment.vsalUrl, {search: params, headers: headers})
            .timeout(VSAL_TIMEOUT)
            .map((response: Response) => {
                if (!response.ok) {
                    return new VariantRequest([], response.toString());
                }
                let res = response.json();
                if (res.error) {
                    return new VariantRequest([], `${res.error.name}: ${res.error.description}`);
                }

                let v = res.variants;
                if (v === null) {
                    v = [];
                }
                let vs = new VariantRequest(v);
                if (res.total && res.total.length > 0) {
                    vs.total = res.total[0];
                }
                return vs;
            })
            .catch(() => {
                return Observable.of(new VariantRequest([], 'An error occurred while trying to connect to VSAL'));
            });
    }
}

