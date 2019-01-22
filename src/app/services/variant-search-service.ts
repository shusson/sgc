import { Injectable } from '@angular/core';
import { VsalService } from './vsal-service';
import { Variant } from '../model/variant';
import { Subject } from 'rxjs/Subject';
import { SearchQuery } from '../model/search-query';
import { VariantRequest } from '../model/variant-request';
import { Region } from '../model/region';
import { of, Observable } from "rxjs";

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

    constructor(private vsal: VsalService) {
        this.results = this.searchQuery
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
                return of<VariantRequest>(new VariantRequest([], e));
            })
            .share();

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

    getSmallerRegionString() {
        return `${this.lastQuery.chromosome}:${this.lastQuery.start}-${this.lastQuery.start + 100000}`;
    }

    hasMoved() {
        return this.startingRegion.start !== this.lastQuery.start || this.startingRegion.end !== this.lastQuery.end;
    }
}

