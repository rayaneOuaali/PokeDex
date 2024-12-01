import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDialogComponentComponent } from './pokemon-dialog-component.component';

describe('PokemonDialogComponentComponent', () => {
  let component: PokemonDialogComponentComponent;
  let fixture: ComponentFixture<PokemonDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
