import { TestBed, inject } from '@angular/core/testing';
import { MapdFilterService } from './mapd-filter.service';


describe('MapdFilterService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MapdFilterService]
        });
    });

    it('should be created', inject([MapdFilterService], (service: MapdFilterService) => {
        expect(service).toBeTruthy();
    }));
});
