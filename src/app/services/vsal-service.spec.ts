import { VsalService, VSAL_VARIANT_LIMIT } from './vsal-service';
import { URLSearchParams, BaseRequestOptions, Http, ResponseOptions, Response } from '@angular/http';
import { Variant } from '../model/variant';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { inject, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { SearchQuery } from '../model/search-query';
import { VariantRequest } from '../model/variant-request';

describe('VSAL Service', () => {
    const mockOptions: any[] = [];
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backendInstance, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                VsalService
            ]
        });
    }));

    describe('getVariants', () => {
        it('should get the variants sorted by position', fakeAsync(
            inject([VsalService, MockBackend], (vsal: VsalService, mockBackend: MockBackend) => {
                const expectedVariants = [
                    {
                        name: 'fred',
                        dbSNP: '',
                        chromosome: 2,
                        start: '50000',
                        reference: 'C',
                        alternate: 'G',
                        type: 'INDEL',
                        variantStats: [
                            {
                                maf: '0.5'
                            }
                        ],
                    },
                    {
                        name: 'fred',
                        dbSNP: '',
                        chromosome: 2,
                        start: '41000',
                        reference: 'C',
                        alternate: 'G',
                        type: 'INDEL',
                        variantStats: [
                            {
                                maf: '0.5'
                            }
                        ],
                    },
                ];
                mockBackend.connections.subscribe((connection: MockConnection) => {
                    const options = new ResponseOptions({
                        body: JSON.stringify({
                            success: true,
                            variants: expectedVariants,
                            total: [2],
                        }),
                        status: 200
                    });
                    connection.mockRespond(new Response(options));
                });

                vsal.getVariants(new SearchQuery('1', 2, 3, mockOptions)).toPromise().then((variantStream: any) => {
                    expect(variantStream.variants).toEqual(expectedVariants.sort((a, b) => {
                        return Math.sign(Number(a.start) - Number(b.start));
                    }));
                });
                tick();
                discardPeriodicTasks();
            })
        ));

        it('should make multiple requests if the total variants is greater than the limit', fakeAsync(
            inject([VsalService, MockBackend], (vsal: VsalService, mockBackend: MockBackend) => {
                let variantResponse = new Array(VSAL_VARIANT_LIMIT).fill({
                    name: 'fred',
                    dbSNP: '',
                    chromosome: 2,
                    start: '50000',
                    reference: 'C',
                    alternate: 'G',
                    type: 'INDEL',
                    variantStats: [
                        {
                            maf: '0.5'
                        }
                    ],
                });
                let expectedVariants: Variant[] = [];
                let count = 0;
                mockBackend.connections.subscribe((connection: MockConnection) => {
                    if (count > 1) {
                        variantResponse = [];
                    }
                    const options = new ResponseOptions({
                        body: JSON.stringify({
                            success: true,
                            variants: variantResponse,
                            total: [VSAL_VARIANT_LIMIT * 3],
                        }),

                        status: 200
                    });
                    connection.mockRespond(new Response(options));
                    expectedVariants = expectedVariants.concat(variantResponse);
                    count++;
                });

                vsal.getVariants(new SearchQuery('1', 2, 3, mockOptions)).toPromise().then((variantStream: VariantRequest) => {
                    expect(variantStream.variants).toEqual(expectedVariants.sort((a, b) => {
                        return Math.sign(Number(a.start) - Number(b.start));
                    }));
                });
                tick();
                discardPeriodicTasks();
                expect(count).toEqual(3);
            })
        ));

        it('should send the correct query', inject([VsalService, MockBackend], (vsal: VsalService, mockBackend: MockBackend) => {
            const chrom = '2';
            const start = 1;
            const end = 10;
            const params = new URLSearchParams();
            params.append('chromosome', chrom);
            params.append('positionStart', start.toString());
            params.append('positionEnd', end.toString());
            params.append('limit', VSAL_VARIANT_LIMIT.toString());
            params.append('count', 'true');
            mockBackend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url).toEqual(environment.vsalUrl + '?' + params.toString());
            });
            vsal.getVariants(new SearchQuery(chrom, start, end, mockOptions));
        }));

        it('should support X chromosome', inject([VsalService, MockBackend], (vsal: VsalService, mockBackend: MockBackend) => {
            const chrom = 'X';
            const start = 1;
            const end = 10;
            const params = new URLSearchParams();
            params.append('chromosome', chrom);
            params.append('positionStart', start.toString());
            params.append('positionEnd', end.toString());
            params.append('limit', VSAL_VARIANT_LIMIT.toString());
            params.append('count', 'true');
            mockBackend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url).toEqual(environment.vsalUrl + '?' + params.toString());
            });
            vsal.getVariants(new SearchQuery(chrom, start, end, mockOptions));
        }));

        it('should have an error if there is an error in the response but the status is 200', fakeAsync(
            inject([VsalService, MockBackend], (vsal: VsalService, mockBackend: MockBackend) => {
                const expectedErrorName = 'I LOVE CARPET';
                const expectedErrorDescription = 'I LOVE LAMP';
                const options = new ResponseOptions({
                    body: JSON.stringify({
                        success: true,
                        error: {name: expectedErrorName, description: expectedErrorDescription},
                        total: [2],
                    }),
                    status: 200,
                });
                const response = new Response(options);
                mockBackend.connections.subscribe((connection: MockConnection) => {
                    connection.mockRespond(response);
                });
                let actualError = '';
                vsal.getVariants(new SearchQuery('1', 2, 3, mockOptions)).toPromise().then((vs: VariantRequest) => {
                    actualError = vs.error;
                });
                tick();
                discardPeriodicTasks();
                expect(actualError).toEqual(`${expectedErrorName}: ${expectedErrorDescription}`);
            })
        ));

        it('should have an error if the response is not OK', fakeAsync(
            inject([VsalService, MockBackend], (vsal: VsalService, mockBackend: MockBackend) => {
                const options = new ResponseOptions({
                    body: JSON.stringify({
                        success: true,
                        total: [2],
                    }),
                    status: 404,
                });
                const response = new Response(options);
                mockBackend.connections.subscribe((connection: MockConnection) => {
                    connection.mockRespond(response);
                });
                let actualError = '';
                vsal.getVariants(new SearchQuery('1', 2, 3, mockOptions)).toPromise().then((vs: VariantRequest) => {
                    actualError = vs.error;
                });
                tick();
                expect(actualError).toEqual(response.toString());
                discardPeriodicTasks();
            })
        ));
    });

});
