import { TestBed } from '@angular/core/testing';

import { GetPokemonsListService } from './get-pokemons-list.service';

describe('GetPokemonsListService', () => {
  let service: GetPokemonsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPokemonsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
