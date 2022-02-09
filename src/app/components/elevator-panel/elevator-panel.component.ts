import { Component, Input } from '@angular/core';

import { ElevatorService } from 'src/app/services/elevator/elevator.service';

@Component({
	selector: 'tce-elevator-panel',
	templateUrl: './elevator-panel.component.html',
	styleUrls: ['./elevator-panel.component.scss']
})
export class ElevatorPanelComponent {
	/* Number of floors in panel */
	@Input() public floors: Number = 4;

	constructor(public elevatorService: ElevatorService) { }

	/**
	 * travel
	 *
	 * Travel's through the building floors
	 *
	 * @param floor - Final desired floor
	 */
	public travel(floor: number): void {
		if (this.elevatorService.currentFloor$.value !== floor) {
			this.elevatorService.newPanelCall$.next(floor);
		}
	}
}
