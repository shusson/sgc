import { VsalService } from './vsal-service';
import { Variant } from '../model/variant';
import { inject, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { VariantSearchService } from './variant-search-service';
import { MockVsalService } from '../mocks/vsal-service.mock';
import { SearchQuery } from '../model/search-query';

const expectedVariants = [
    {
        name: 'V2301',
        dbSNP: '',
        chromosome: '14',
        start: '2000',
        reference: 'T',
        alternate: 'C',
        type: 'INDEL',
        alleleFreq: '0.3'
    }
];

// TODO: remove explicit times in ticks once bug https://github.com/angular/angular/issues/8251 is fixed
// (ticks don't work correctly on observables with debounce)
const TEST_TICKS = 1000;
describe('Search Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: VsalService,
                    useValue: new MockVsalService(expectedVariants)
                },
                VariantSearchService
            ]
        });
    });

    describe('getVariants', () => {
        it('should get the variants', fakeAsync(inject([VariantSearchService], (search: VariantSearchService) => {
            search.getVariants(new SearchQuery('1', 2, 3, [])).then((variants: any) => {
                expect(variants).toEqual(expectedVariants);
            });
            tick(TEST_TICKS);
        })));

        it('should return an empty array if there is an error', fakeAsync(
            inject([VariantSearchService,
                    VsalService],
                (search: VariantSearchService, vsal: VsalService) => {
                    const expectedError = 'BOOP';
                    (<any>vsal).setError(expectedError);
                    search.getVariants(new SearchQuery('1', 2, 3, [])).then((v: Variant[]) => {
                        expect(v).toEqual([]);
                    });
                    tick(TEST_TICKS);
            })
        ));
    });

});
