import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorPanelComponent } from './elevator-panel.component';

describe('ElevatorPanelComponent', () => {
  let component: ElevatorPanelComponent;
  let fixture: ComponentFixture<ElevatorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElevatorPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElevatorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
