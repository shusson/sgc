import { TestBed, inject } from '@angular/core/testing';

import { CrossfilterService } from './crossfilter.service';

describe('CrossfilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrossfilterService]
    });
  });

  it('should be created', inject([CrossfilterService], (service: CrossfilterService) => {
    expect(service).toBeTruthy();
  }));
});
