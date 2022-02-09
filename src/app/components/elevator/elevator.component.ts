import { Component } from '@angular/core';

import { BuildingService } from 'src/app/services/building/building.service';
import { ElevatorService } from 'src/app/services/elevator/elevator.service';

@Component({
	selector: 'tce-elevator',
	templateUrl: './elevator.component.html',
	styleUrls: ['./elevator.component.scss']
})
export class ElevatorComponent {
	constructor(
		public elevatorService: ElevatorService,
		public buildingService: BuildingService
	) { }
}
