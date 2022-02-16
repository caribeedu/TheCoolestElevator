import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorPanelComponent } from './elevator-panel.component';

import { ElevatorService } from 'src/app/services/elevator/elevator.service';
import { BuildingService } from 'src/app/services/building/building.service';

import { ElevatorDoor } from 'src/app/enum/elevator.enum';

describe('ElevatorPanelComponent', () => {
	let component: ElevatorPanelComponent;
	let fixture: ComponentFixture<ElevatorPanelComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ElevatorPanelComponent],
			providers: [
				ElevatorService,
				BuildingService
			]
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

	describe('#travel', () => {
		let newPanelCallSpy: jasmine.Spy;

		beforeEach(() => {
			newPanelCallSpy = spyOn(component.elevatorService.newPanelCall$, 'next');
		});

		it('should call elevatorService newPanelCall$ #next with desired floor', () => {
			spyOnProperty(component.elevatorService.currentFloor$, 'value').and.returnValue(1);
			spyOnProperty(component.elevatorService.doors$, 'value').and.returnValue(ElevatorDoor.CLOSED);

			const floorDouble: number = 2;

			component.travel(floorDouble);

			expect(newPanelCallSpy).toHaveBeenCalledOnceWith(floorDouble);
		});

		it('shouldn\'t call elevatorService newPanelCall$ #next with desired floor if this is the current floor and doors is opened', () => {
			const floorDouble: number = 2;

			spyOnProperty(component.elevatorService.currentFloor$, 'value').and.returnValue(floorDouble);
			spyOnProperty(component.elevatorService.doors$, 'value').and.returnValue(ElevatorDoor.OPENED);

			component.travel(floorDouble);

			expect(newPanelCallSpy).not.toHaveBeenCalled();
		});
	});
});
