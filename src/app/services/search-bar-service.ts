import { Injectable } from '@angular/core';
import { RegionService } from './autocomplete/region-service';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable, Subject } from 'rxjs';
import { SearchOption } from '../model/search-option';
import { Router, Params } from '@angular/router';
import { AutocompleteService } from './autocomplete/autocomplete-service';
import { AutocompleteResult } from '../model/autocomplete-result';
import { ElasticGeneSearch } from './autocomplete/elastic-gene-search-service';
import { PositionService } from './autocomplete/position-service';

@Injectable()
export class SearchBarService {
    query = '';
    autocompleteServices: AutocompleteService<any>[] = [];
    options: SearchOption[];
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
        this.options = [
            new SearchOption('Cohorts', '', ['MGRB'], 'MGRB'),
        ];
    }

    searchWithParams(params: Params): Promise<AutocompleteResult<any>> {
        let query = params['query'];
        if (!query) {
            return <any>Promise.resolve();
        }
        this.parseOptions(params);

        if (!this.query) {
            this.query = query;
        }

        this.searchedEvent.next();

        let handleAutocompleteError = (e: string): Promise<any> => {
            this.autocompleteError = e;
            return Promise.reject(e);
        };

        return this.searchAutocompleteServices(query).take(1).toPromise().then(v => {
            if (v.length <= 0) {
                return handleAutocompleteError('Failed to find any results for: ' + query);
            }
            let bestMatch = v[0];
            if (bestMatch.match(query)) {
                return bestMatch;
            } else {
                return handleAutocompleteError('Failed to find any results for: ' + query);
            }
        });

    }

    parseOptions(params: Params) {
        this.options.forEach(o => {
            if (params[o.key]) {
                o.setValue(params[o.key]);
            }
        });
    }

    search(query: string): void {
        this.query = query;
        this.navigateToSearch(query);
    }

    searchAutocompleteServices(term: string): Observable<AutocompleteResult<any>[]> {
        return combineLatest(...this.autocompleteServices.map((autocompleteService) => {
            return autocompleteService.search(term).catch(e => Observable.of<AutocompleteResult<any>[]>([]));
        }), this.combineStreams);
    }

    searchAutocompleteServicesStartsWith(term: string, startsWith: any[] = []): Observable<AutocompleteResult<any>[]> {
        return combineLatest(...this.autocompleteServices.map((autocompleteService) => {
            return autocompleteService.search(term).startWith(startsWith).catch(e => Observable.of<AutocompleteResult<any>[]>([]));
        }), this.combineStreams);
    }

    displayDescription(desc: string) {
        if (!desc) {
            return '';
        } else {
            let results = desc.match(/(.*)\s\[Source:.*;Acc:.*\]$/);
            if (results) {
                return results[1];
            } else {
                return desc;
            }
        }
    }

    private navigateToSearch(query: string) {
        let obj = {query: query, timestamp: Date.now()};
        this.router.navigate(['/search/results', obj]);
    }

    private combineStreams(s1: any[], s2: any[], s3: any[]) {
        return s1.concat(s2).concat(s3);
    }
}

