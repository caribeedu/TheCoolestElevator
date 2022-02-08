import { Component } from '@angular/core';

import { ElevatorService } from 'src/app/services/elevator/elevator.service';

@Component({
	selector: 'tce-elevator-panel',
	templateUrl: './elevator-panel.component.html',
	styleUrls: ['./elevator-panel.component.scss']
})
export class ElevatorPanelComponent {

	constructor(public elevatorService: ElevatorService) { }

	/**
	 * travelFloor
	 *
	 * Travel's through the building floors
	 *
	 * @param floor - Final desired floor
	 */
	public travelFloor(floor: number): void {
		if (this.elevatorService.currentFloor$.value !== floor) {
			this.elevatorService.travelPanel(floor);
		}
	}
}
