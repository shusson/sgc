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
            new SearchOption('Type', 'type', ['SNV', 'MNV', 'CNV', 'SV', 'INDEL'], ''),
            new SearchOption('Reference', 'refAllele', ['A', 'C', 'G', 'T'], ''),
            new SearchOption('Alternate', 'altAllele', ['A', 'C', 'G', 'T'], ''),
        ];
    }

    reload() {
        this.search(this.query);
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

        let handleAutocompleteError = (e: any) => {
            this.autocompleteError = e.message ? e.message : e;
        };

        return this.searchAutocompleteServices(query).take(1).toPromise().then(v => {
            if (v.length <= 0) {
                handleAutocompleteError('Failed to find any results for: ' + query);
                return null;
            }
            let bestMatch = v[0];
            if (bestMatch.match(query)) {
                return bestMatch;
            } else {
                handleAutocompleteError('Failed to find any results for: ' + query);
                return null;
            }
        }).catch(handleAutocompleteError);

    }

    parseOptions(params: Params) {
        this.options.forEach(o => {
            if (params[o.key]) {
                o.setValue(params[o.key]);
            }
        });
    }

    searchWithAutocompleteResult(result: AutocompleteResult<any>): void {
        this.query = result.displayName();
        this.navigateToSearch(result.symbol);
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
        let options = this.options
            .filter(v => v.getValue() && v.key)
            .map(v => {
                return v.urlOption();
            });
        let obj = {query: query, timestamp: Date.now()};
        Object.assign(obj, ...options);
        this.router.navigate(['/search/results', obj]);
    }

    private combineStreams(s1: any[], s2: any[], s3: any[]) {
        return s1.concat(s2).concat(s3);
    }
}

