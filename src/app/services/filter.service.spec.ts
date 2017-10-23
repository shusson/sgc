import { TestBed, inject } from '@angular/core/testing';
import { FilterService } from './filter.service';
import { TableService } from './column-service';

describe('FilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          FilterService,
          TableService
      ]
    });
  });

  it('should ...', inject([FilterService], (service: FilterService) => {
    expect(service).toBeTruthy();
  }));
});
