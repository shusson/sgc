import { Injectable } from '@angular/core';
import { VsalService } from './vsal-service';
import { Variant } from '../model/variant';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { SearchQuery } from '../model/search-query';
import { VariantRequest } from '../model/variant-request';
import { Region } from '../model/region';

const DEBOUNCE_TIME = 100;

@Injectable()
export class VariantSearchService {
    variants: Variant[] = [];
    total = 0;
    results: Observable<VariantRequest>;
    errors = new Subject<any>();
    commenced = false;
    lastQuery: SearchQuery;
    startingRegion: Region;
    filter: (vp: VariantRequest) => VariantRequest = null;
    private searchQuery = new Subject<SearchQuery>();

    constructor(private vsal: VsalService) {
        this.results = this.searchQuery
            .debounceTime(DEBOUNCE_TIME)
            .switchMap((query: SearchQuery) => {
                return this.vsal.getVariantsWithCount(query).map((vr: VariantRequest) => {
                    if (this.filter) {
                        vr = this.filter(vr);
                    }
                    return vr;
                });
            })
            .catch(e => {
                this.errors.next(e);
                return Observable.of<VariantRequest>(new VariantRequest([], e));
            })
            .share();

        this.results.subscribe((vr: VariantRequest) => {
            if (!this.startingRegion) {
                this.startingRegion = new Region(this.lastQuery.chromosome, this.lastQuery.start, this.lastQuery.end);
            }
            this.variants = vr.variants;
            this.total = vr.total;
            this.commenced = true;
        });
    }

    getVariants(query: SearchQuery): Promise<Variant[]> {
        this.lastQuery = query;
        const promise = new Promise<Variant[]>((resolve, reject) => {
            this.results.take(1).subscribe(
                (vr: VariantRequest) => {
                    if (vr.error) {
                        this.errors.next(vr.error);
                        resolve([]);
                        return;
                    }
                    resolve(vr.variants);
                },
                (e: any) => {
                    this.errors.next(e);
                    resolve([]);
                }
            );
        });
        this.searchQuery.next(query);
        return promise;
    }

    getVariantsWithAnnotations(query: SearchQuery, limit: number, skip: number): Promise<VariantRequest> {
        return this.vsal.getVariantsWithAnnotations(query, limit, skip).map((vr: VariantRequest) => {
            if (this.filter) {
                vr.variants = this.variants;
            }
            vr.total = this.total;
            return vr;
        }).toPromise();
    }

    getCurrentRegion(): Region {
        if (!this.lastQuery) {
            return null;
        }
        return new Region(this.lastQuery.chromosome, this.lastQuery.start, this.lastQuery.end);
    }

    getSmallerRegionString() {
        return `${this.lastQuery.chromosome}:${this.lastQuery.start}-${this.lastQuery.start + 100000}`;
    }

    hasMoved() {
        return this.startingRegion.start !== this.lastQuery.start || this.startingRegion.end !== this.lastQuery.end;
    }
}

