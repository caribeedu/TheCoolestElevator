import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorComponent } from './elevator.component';

import { ElevatorService } from 'src/app/services/elevator/elevator.service';
import { BuildingService } from 'src/app/services/building/building.service';

describe('ElevatorComponent', () => {
	let component: ElevatorComponent;
	let fixture: ComponentFixture<ElevatorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ElevatorComponent],
			providers: [
				ElevatorService,
				BuildingService
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ElevatorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
