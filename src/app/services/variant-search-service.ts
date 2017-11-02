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
    results: Observable<VariantRequest>;
    errors = new Subject<any>();
    commenced = false;
    lastQuery: SearchQuery;
    startingRegion: Region;
    filter: any = null;
    private searchQuery = new Subject<SearchQuery>();
    private variantsObserver: Observable<VariantRequest>;

    constructor(private vsal: VsalService) {
        this.variantsObserver = this.searchQuery
            .debounceTime(DEBOUNCE_TIME)
            .switchMap((query: SearchQuery) => {
                return this.vsal.getVariants(query).map((vr: VariantRequest) => {
                    if (this.filter) {
                        vr.variants = this.filter(vr.variants);
                    }
                    return vr;
                });
            })
            .catch(e => {
                this.errors.next(e);
                return Observable.of<VariantRequest>(new VariantRequest([], e));
            })
            .share();

        this.results = this.variantsObserver;

        this.results.subscribe((cs) => {
            if (!this.startingRegion) {
                this.startingRegion = new Region(this.lastQuery.chromosome, this.lastQuery.start, this.lastQuery.end);
            }
            this.variants = cs.variants;
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

    getCurrentRegion(): Region {
        if (!this.lastQuery) {
            return null;
        }
        return new Region(this.lastQuery.chromosome, this.lastQuery.start, this.lastQuery.end);
    }

    hasMoved() {
        return this.startingRegion.start !== this.lastQuery.start || this.startingRegion.end !== this.lastQuery.end;
    }
}

