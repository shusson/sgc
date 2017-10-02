import { Injectable } from '@angular/core';
import { HETEROZYGOTES_KEY, HOMOZYGOTES_KEY, Variant } from '../model/variant';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SearchQuery } from '../model/search-query';
import { VariantRequest } from '../model/variant-request';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

export const VSAL_VARIANT_LIMIT = 10000;
export const VSAL_TIMEOUT = 60000;

@Injectable()
export class VsalService {
    constructor(private http: HttpClient) {
    }

    getVariants(query: SearchQuery): Observable<VariantRequest> {
        let urlParams = new HttpParams()
            .append('chromosome', query.chromosome)
            .append('positionStart', String(query.start))
            .append('positionEnd', String(query.end))
            .append('limit', VSAL_VARIANT_LIMIT.toString());

        if (query.samples.length > 0) {
            urlParams = urlParams.append('samples', query.samples.join(","));
        }

        query.options.forEach(o => {
            if (o.key) {
                urlParams = urlParams.append(o.key, o.getValue());
            }
        });

        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', '*/*');
        return this.requests(urlParams, headers).reduce((acc: VariantRequest, x: VariantRequest, i: number) => {
            acc.variants = acc.variants.concat(x.variants);
            acc.error += x.error;
            return acc;
        }, new VariantRequest([])).map((v: VariantRequest) => {
            v.variants.sort((a: Variant, b: Variant) => a.start - b.start);
            return v;
        });
    }

    private requests(params: HttpParams, headers: HttpHeaders): Observable<VariantRequest> {
        params = params.append('count', 'true');
        return Observable.create((observer) => {
            this.request(params, headers).subscribe((vs: VariantRequest) => {
                observer.next(vs);
                if (vs.error) {
                    observer.complete();
                } else {
                    if (vs.total > VSAL_VARIANT_LIMIT) {
                        let i: number;
                        let completed = 0;
                        const queued = Math.floor(vs.total / VSAL_VARIANT_LIMIT);
                        for (i = VSAL_VARIANT_LIMIT; i < vs.total; i += VSAL_VARIANT_LIMIT) {
                            params = params.set('skip', String(i));
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

    private request(params: HttpParams, headers: HttpHeaders): Observable<VariantRequest> {
        return this.http.get(environment.vsalUrl, {params: params, headers: headers})
            .timeout(VSAL_TIMEOUT)
            .map((data) => {
                if (data['error']) {
                    return new VariantRequest([], `${data['error'].name}: ${data['error'].description}`);
                }
                const variants = data['v'].map(v => {

                    const variant = new Variant();
                    //     // virtual cohort-wide alt allele stats
                    // private Integer     vac; // alt allele count
                    // private Float       vaf; // alt allele freq
                    // private Integer   vhomc; // alt allele hom count
                    // private Integer   vhetc; // alt allele het count

                    variant.start = v.s;
                    variant.chromosome = v.c;
                    variant.dbSNP = v.rs;
                    variant.alternate = v.a;
                    variant.reference = v.r;
                    variant.type = v.type;

                    variant.AC = v.ac ? v.ac : v.vac;
                    variant.AF = v.af ? v.af : v.vaf;
                    variant.nHomRef = v.homc; // nHomHOME
                    variant.nHet = v.hetc;

                    const stats: any = {
                        altAlleleFreq: variant.AF,
                        altAlleleCount: variant.AC
                    };

                    stats.genotypesCount = {};
                    stats.genotypesCount[HOMOZYGOTES_KEY] = v.homc;
                    stats.genotypesCount[HETEROZYGOTES_KEY] = v.hetc;
                    variant.variantStats = [stats];
                    return variant;
                });
                const vs = new VariantRequest(variants);
                vs.total = data['total'];
                return vs;
            })
            .catch((e) => {
                console.log(e);
                return Observable.of(new VariantRequest([], 'An error occurred while trying to connect to VSAL'));
            });
    }
}

