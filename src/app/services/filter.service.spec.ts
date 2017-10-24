import { TestBed, inject } from '@angular/core/testing';
import { FilterService } from './filter.service';
import { TableService } from './table-service';

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
