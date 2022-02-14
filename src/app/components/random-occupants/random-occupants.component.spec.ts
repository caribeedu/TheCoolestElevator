import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomOccupantsComponent } from './random-occupants.component';

describe('RandomOccupantsComponent', () => {
  let component: RandomOccupantsComponent;
  let fixture: ComponentFixture<RandomOccupantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomOccupantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomOccupantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
