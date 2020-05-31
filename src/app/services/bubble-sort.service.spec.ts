import { TestBed } from '@angular/core/testing';

import { BubbleSortService } from './bubble-sort.service';

describe('BubbleSortService', () => {
  let service: BubbleSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BubbleSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
