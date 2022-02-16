import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingFloorComponent } from './building-floor.component';

import { ElevatorService } from 'src/app/services/elevator/elevator.service';

describe('BuildingFloorComponent', () => {
	let component: BuildingFloorComponent;
	let fixture: ComponentFixture<BuildingFloorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BuildingFloorComponent],
			providers: [ElevatorService]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BuildingFloorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();

		expect(component.elevatorService).toBeDefined();

		expect(component.floorNumber).toBeDefined();
		expect(component.floorNumber).toBeGreaterThan(0);
		expect(component.firstFloor).toBeDefined();
		expect(component.lastFloor).toBeDefined();
	});

	describe('#callElevator', () => {
		let newFloorCallSpy: jasmine.Spy;

		beforeEach(() => {
			newFloorCallSpy = spyOn(component.elevatorService.newFloorCall$, 'next');
		});

		it('should call elevatorService newFloorCall$ #next with this floor number', () => {
			component.callElevator();

			expect(newFloorCallSpy).toHaveBeenCalledOnceWith(component.floorNumber);
		});
	});
});
