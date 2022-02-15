import { Component } from '@angular/core';

import { RandomOccupantService } from 'src/app/services/random-occupant/random-occupant.service';

@Component({
	selector: 'tce-random-occupants',
	templateUrl: './random-occupants.component.html',
	styleUrls: ['./random-occupants.component.scss']
})
export class RandomOccupantsComponent {
	constructor(public randomOccupantsService: RandomOccupantService) { }
}
