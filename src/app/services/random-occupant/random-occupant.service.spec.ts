import { TestBed } from '@angular/core/testing';

import { RandomOccupantService } from './random-occupant.service';

describe('RandomOccupantService', () => {
  let service: RandomOccupantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomOccupantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
