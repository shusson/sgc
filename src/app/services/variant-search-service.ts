import { Injectable } from '@angular/core';
import { VsalService } from './vsal-service';
import { Variant } from '../model/variant';
import { Subject, Observable } from 'rxjs';
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
    startingQuery: SearchQuery;
    private searchQuery = new Subject<SearchQuery>();
    private variantsObserver: Observable<VariantRequest>;

    constructor(private vsal: VsalService) {
        this.variantsObserver = this.searchQuery
            .debounceTime(DEBOUNCE_TIME)
            .switchMap((query: SearchQuery) => {
                return this.vsal.getVariants(query);
            })
            .catch(e => {
                this.errors.next(e);
                return Observable.of<VariantRequest>(new VariantRequest([], e));
            })
            .share();

        this.results = this.variantsObserver;

        this.results.subscribe((cs) => {
            if (!this.startingQuery) {
                this.startingQuery = new SearchQuery(this.lastQuery.chromosome,
                    this.lastQuery.start,
                    this.lastQuery.end,
                    this.lastQuery.options,
                    this.lastQuery.samples);
            }
            this.variants = cs.variants;
            this.commenced = true;
        });
    }

    getVariants(query: SearchQuery): Promise<Variant[]> {
        this.lastQuery = query;
        const promise = new Promise((resolve, reject) => {
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
        return this.startingQuery.start !== this.lastQuery.start ||
            this.startingQuery.end !== this.lastQuery.end ||
            this.startingQuery.samples !== this.lastQuery.samples;
    }
}

