import { Component, Input } from '@angular/core';

import { ElevatorService } from 'src/app/services/elevator/elevator.service';

@Component({
	selector: 'tce-elevator',
	templateUrl: './elevator.component.html',
	styleUrls: ['./elevator.component.scss']
})
export class ElevatorComponent {
	/* Number of floors */
	@Input() public floors: Number = 4;

	constructor(public elevatorService: ElevatorService) { }
}
