import { TestBed } from '@angular/core/testing';

import { GetMovesListService } from './get-moves-list.service';

describe('GetMovesListService', () => {
  let service: GetMovesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMovesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
