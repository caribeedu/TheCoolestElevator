import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorPanelComponent } from './elevator-panel.component';

import { ElevatorService } from 'src/app/services/elevator/elevator.service';

describe('ElevatorPanelComponent', () => {
	let component: ElevatorPanelComponent;
	let fixture: ComponentFixture<ElevatorPanelComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ElevatorPanelComponent],
			providers: [ElevatorService]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ElevatorPanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('#travelFloor', () => {
		it('should call elevatorService #travelPanel with desired floor', () => {

		});

		it('shouldn\'t call elevatorService #travelPanel with desired floor if this is the current floor', () => {

		});
	});
});
