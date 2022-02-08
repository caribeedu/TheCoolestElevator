import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingFloorComponent } from './building-floor.component';

describe('BuildingFloorComponent', () => {
  let component: BuildingFloorComponent;
  let fixture: ComponentFixture<BuildingFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingFloorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
