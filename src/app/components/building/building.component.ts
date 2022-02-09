import { Component, Input } from '@angular/core';

@Component({
	selector: 'tce-building',
	templateUrl: './building.component.html',
	styleUrls: ['./building.component.scss']
})
export class BuildingComponent {
	/* Number of floors in building */
	@Input() public readonly floors: Number = 4;
}
