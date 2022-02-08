import { Component, Input } from '@angular/core';

import { ElevatorService } from 'src/app/services/elevator/elevator.service';

@Component({
	selector: 'tce-building-floor',
	templateUrl: './building-floor.component.html',
	styleUrls: ['./building-floor.component.scss']
})
export class BuildingFloorComponent {
	/* This floor number */
	@Input() public floorNumber: number = 1;

	constructor(public elevatorService: ElevatorService) { }

	/**
	 * callElevator
	 *
	 * Call's the elevator to this floor
	 */
	public callElevator(): void {
		this.elevatorService.call(this.floorNumber);
	}
}
