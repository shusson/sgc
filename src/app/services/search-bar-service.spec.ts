import { TestBed, inject, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { SearchBarService } from './search-bar-service';
import { RegionService } from './autocomplete/region-service';
import { Router } from '@angular/router';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ElasticGeneSearch } from './autocomplete/elastic-gene-search-service';
import { PositionService } from './autocomplete/position-service';
import { of } from "rxjs";

describe('SearchBar Service', () => {
    let crumbs: any[];
    let icgcSearches: string[];
    let regionSearches: string[];
    let icgcResult: any;
    let regionResult: any;
    beforeEach(() => {
        icgcSearches = [];
        regionSearches = [];
        crumbs = [];
        icgcResult = null;
        regionResult = null;
        TestBed.configureTestingModule({
            providers: [
                SearchBarService,
                {
                    provide: ElasticGeneSearch,
                    useValue: {
                        search: (s: string) => {
                            icgcSearches.push(s);
                            return icgcResult;
                        }
                    }
                },
                {
                    provide: RegionService,
                    useValue: {
                        search: (s: string) => {
                            regionSearches.push(s);
                            return regionResult;
                        }
                    }
                },
                {
                    provide: PositionService,
                    useValue: {
                        search: (s: string) => {
                            return of<any>([]);
                        }
                    }
                },
                {
                    provide: Router,
                    useValue: {
                        navigate: (url: any[]) => {
                            crumbs.push(url);
                        }
                    }
                },
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backendInstance, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
            ]
        });
    });

    describe('search', () => {
        it('should route to the correct url', fakeAsync(
            inject([SearchBarService], (searchBarService: SearchBarService) => {
                const q = 'fred';
                expect(crumbs.length).toEqual(0);
                searchBarService.search(q);
                expect(crumbs.length).toEqual(1);
                expect(crumbs[0][0]).toEqual('/search/results');
                expect(crumbs[0][1].query).toEqual(q);
            })
        ));
    });


    describe('searchAutocompleteServices', () => {
        it('should search all the annnotation services and return autocomplete types', fakeAsync(
            inject([SearchBarService], (searchBarService: SearchBarService) => {
                const q = 'cactus';
                let result: any[] = null;
                const a = ['light'];
                const b = ['saber'];
                icgcResult = of(a);
                regionResult = of(b);
                expect(icgcSearches).toEqual([]);
                expect(regionSearches).toEqual([]);
                searchBarService.searchAutocompleteServices(q).subscribe((v) => result = v);
                expect(icgcSearches).toEqual([q]);
                expect(regionSearches).toEqual([q]);
                tick();
                expect(result).toEqual(b.concat(a));
            })
        ));
    });

    describe('searchAutocompleteServicesStartsWith', () => {
        it('should search all the annnotation services and return autocomplete types', fakeAsync(
            inject([SearchBarService], (searchBarService: SearchBarService) => {
                const q = 'cactus';
                const startsWith = ['bees'];
                const a = ['broad'];
                const b = ['sword'];
                icgcResult = of(a);
                regionResult = of(b);
                let result: any[] = null;
                expect(icgcSearches).toEqual([]);
                expect(regionSearches).toEqual([]);
                searchBarService.searchAutocompleteServicesStartsWith(q, startsWith).subscribe((v) => result = v);
                expect(icgcSearches).toEqual([q]);
                expect(regionSearches).toEqual([q]);
                tick();
                expect(result).toEqual(b.concat(a));
            })
        ));
        it('should return startsWith if the observable does not emit immediately', fakeAsync(
            inject([SearchBarService], (searchBarService: SearchBarService) => {
                const q = 'cactus';
                const startsWith = ['bees'];
                icgcResult = of(['broad']).delay(new Date(Date.now() + 100));
                regionResult = of(['sword']).delay(new Date(Date.now() + 100));
                let result: any[] = null;
                expect(icgcSearches).toEqual([]);
                expect(regionSearches).toEqual([]);
                searchBarService.searchAutocompleteServicesStartsWith(q, startsWith).subscribe((v) => result = v);
                expect(icgcSearches).toEqual([q]);
                expect(regionSearches).toEqual([q]);
                tick();
                expect(result).toEqual(startsWith.concat(startsWith));
                discardPeriodicTasks();
            })
        ));
    });

});
