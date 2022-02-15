import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RandomOccupantService } from 'src/app/services/random-occupant/random-occupant.service';

@Component({
	selector: 'tce-building-configurator',
	templateUrl: './building-configurator.component.html',
	styleUrls: ['./building-configurator.component.scss']
})
export class BuildingConfiguratorComponent {
	/* Params form group */
	public paramsForm: FormGroup | undefined;

	constructor(public randomOccupantsService: RandomOccupantService) { }

	/**
	 * ngOnInit
	 *
	 * Angular lifecycle method - executed after directive is initialized
	 */
	public ngOnInit(): void {
		this.initForm();
	}

	/**
	 * initForm
	 *
	 * Initialize form group with default service params values
	 */
	public initForm(): void {
		this.paramsForm = new FormGroup({
			occupantsAppearInterval: new FormControl(
				this.randomOccupantsService.appearInterval$.value,
				[Validators.required, Validators.min(1)]
			)
		});
	}

	/**
	 * updateParams
	 *
	 * Update service dynamic params
	 */
	public updateParams(): void {
		const interval: number = this.paramsForm?.value.occupantsAppearInterval || 0;
		this.randomOccupantsService.changeOccupantsAppearInterval(interval);
	}
}
