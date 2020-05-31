import { TestBed } from '@angular/core/testing';

import { HeapSortService } from './heap-sort.service';

describe('HeapSortService', () => {
  let service: HeapSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeapSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
