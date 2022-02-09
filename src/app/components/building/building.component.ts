import { Component } from '@angular/core';
import { BuildingService } from 'src/app/services/building/building.service';

@Component({
	selector: 'tce-building',
	templateUrl: './building.component.html',
	styleUrls: ['./building.component.scss']
})
export class BuildingComponent {
	constructor(public buildingService: BuildingService) { }
}
