import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovesListItemComponent } from './moves-list-item.component';

describe('MovesListItemComponent', () => {
  let component: MovesListItemComponent;
  let fixture: ComponentFixture<MovesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovesListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
