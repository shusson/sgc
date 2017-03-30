import { RegionService } from './region-service';
import { tick, discardPeriodicTasks, inject, fakeAsync, TestBed } from '@angular/core/testing';
import { RegionAutocomplete } from '../../model/region-autocomplete';
import { Region } from '../../model/region';
import { AutocompleteResult } from '../../model/autocomplete-result';
import { Http, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { EnsemblService } from '../ensembl-service';

describe('Region Service', () => {
    let region = new Region('1', 2, 3);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RegionService,
                MockBackend,
                BaseRequestOptions,
                EnsemblService,
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
        it('should return region autocomplete result', fakeAsync(
            inject([RegionService], (regionService: RegionService) => {
                let result: AutocompleteResult<Region>[] = null;
                regionService.search(region.name()).toPromise().then(v => result = v);
                tick();
                expect(result[0].symbol).toEqual(region.name());
                discardPeriodicTasks();
            })
        ));

        it('should return region autocomplete result for other syntaxes too', fakeAsync(
            inject([RegionService], (regionService: RegionService) => {
                let result: AutocompleteResult<Region>[] = null;
                regionService.search(region.chromosome + '.' + region.start + '-' + region.end).toPromise().then(v => result = v);
                tick();
                expect(result[0].symbol).toEqual(region.name());
                discardPeriodicTasks();
            })
        ));
    });

    describe('getDetails', () => {
        it('should return a region', fakeAsync(
            inject([RegionService, MockBackend], (regionService: RegionService, mockBackend: MockBackend) => {
                let regionResult = new RegionAutocomplete(
                    region,
                    'fred',
                    '',
                    regionService
                );
                let options = new ResponseOptions({
                    body: JSON.stringify([]),
                    status: 200,
                });
                let response = new Response(options);
                mockBackend.connections.subscribe((connection: MockConnection) => {
                    connection.mockRespond(response);
                });
                let result: Region = null;
                regionService.getDetails(regionResult).toPromise().then(v => result = v);
                tick();
                expect(result.start).toEqual(region.start);
                discardPeriodicTasks();
            })
        ));
    });
});
