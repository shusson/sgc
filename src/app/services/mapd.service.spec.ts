import { TestBed, inject } from '@angular/core/testing';

import { MapdService } from './mapd.service';

describe('MapdService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MapdService]
        });
    });

    it('should be created', inject([MapdService], (service: MapdService) => {
        expect(service).toBeTruthy();
    }));
});
