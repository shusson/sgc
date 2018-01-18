import { Injectable } from '@angular/core';
import { RegionService } from './autocomplete/region-service';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router, Params } from '@angular/router';
import { AutocompleteService } from './autocomplete/autocomplete-service';
import { GenericAutocompleteResult, VariantAutocompleteResult } from '../model/autocomplete-result';
import { ElasticGeneSearch } from './autocomplete/elastic-gene-search-service';
import { PositionService } from './autocomplete/position-service';

@Injectable()
export class SearchBarService {
    query = '';
    autocompleteServices: AutocompleteService<any>[] = [];
    autocompleteError = '';
    searchedEvent = new Subject();

    constructor(private geneService: ElasticGeneSearch,
                private regionService: RegionService,
                private positionService: PositionService,
                private router: Router) {
        this.autocompleteServices = [
            regionService,
            positionService,
            geneService
        ];

        this.autocompleteError = '';
        this.query = '';
    }

    searchWithParams(params: Params): Promise<VariantAutocompleteResult<any>> {
        const query = params['query'];
        if (!query) {
            return <any>Promise.resolve();
        }

        if (!this.query) {
            this.query = query;
        }

        this.searchedEvent.next();

        const handleAutocompleteError = (e: string): Promise<any> => {
            this.autocompleteError = e;
            return Promise.reject(e);
        };

        return this.searchAutocompleteServices(query).take(1).toPromise().then(v => {
            if (v.length <= 0) {
                return handleAutocompleteError('Failed to find any results for: ' + query);
            }
            const bestMatch = v[0];
            if (bestMatch.match(query)) {
                return bestMatch;
            } else {
                return handleAutocompleteError('Failed to find any results for: ' + query);
            }
        });

    }

    search(query: string): void {
        this.query = query;
        this.navigateToSearch(query);
    }

    searchAutocompleteServices(term: string): Observable<VariantAutocompleteResult<any>[]> {
        return combineLatest(...this.autocompleteServices.map((autocompleteService) => {
            return autocompleteService.search(term).catch(e => Observable.of<GenericAutocompleteResult<any>[]>([]));
        }), this.combineStreams);
    }

    searchAutocompleteServicesStartsWith(term: string, startsWith: any[] = []): Observable<GenericAutocompleteResult<any>[]> {
        return combineLatest(this.autocompleteServices.map((autocompleteService) => {
            return autocompleteService.search(term).startWith(startsWith).catch(e => Observable.of([]));
        }), this.combineStreams);
    }

    displayDescription(desc: string) {
        if (!desc) {
            return '';
        } else {
            const results = desc.match(/(.*)\s\[Source:.*;Acc:.*\]$/);
            if (results) {
                return results[1];
            } else {
                return desc;
            }
        }
    }

    private navigateToSearch(query: string) {
        const obj = {query: query, timestamp: Date.now()};
        this.router.navigate(['/search/results', obj]);
    }

    private combineStreams(...streams) {
        return [].concat.apply([], streams);
    }
}

