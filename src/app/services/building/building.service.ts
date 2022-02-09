import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BuildingService {
	/* Number of floors in the building */
	public readonly numberOfFloors$: BehaviorSubject<Number> = new BehaviorSubject<Number>(4);
}
