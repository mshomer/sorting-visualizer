import { TestBed } from '@angular/core/testing';

import { QuickSortService } from './quick-sort.service';

describe('QuickSortService', () => {
  let service: QuickSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
