import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovesListPageComponent } from './moves-list-page.component';

describe('MovesListPageComponent', () => {
  let component: MovesListPageComponent;
  let fixture: ComponentFixture<MovesListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovesListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
