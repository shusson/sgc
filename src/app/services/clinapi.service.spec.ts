import { TestBed, inject } from '@angular/core/testing';

import { ClinapiService } from './clinapi.service';

describe('ClinapiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ClinapiService]
        });
    });

    it('should be created', inject([ClinapiService], (service: ClinapiService) => {
        expect(service).toBeTruthy();
    }));
});
