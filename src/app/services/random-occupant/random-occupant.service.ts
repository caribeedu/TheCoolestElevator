import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { BuildingService } from '../building/building.service';
import { ElevatorService } from '../elevator/elevator.service';

@Injectable({
	providedIn: 'root'
})
export class RandomOccupantService {
	/* Interval of new occupants appearing in the building, in seconds */
	public readonly appearInterval$: BehaviorSubject<number> = new BehaviorSubject<number>(7.5);
	/* Floors who's has occupants awaiting */
	public readonly occupiedFloors$: BehaviorSubject<Array<Number>> = new BehaviorSubject<Array<Number>>([]);

	constructor(
		public elevatorService: ElevatorService,
		public buildingService: BuildingService
	) {
		this.handleElevatorArriving();
		this.generateNewOccupant();
	}

	/**
	 * getRandomAvailableFloor
	 *
	 * Gets a random floor with no occupants and where the elevator isn't in
	 *
	 * @returns Floor number, if hasn't any available, returns null
	 */
	public getRandomAvailableFloor(): Number | null {
		const totalFloorsNumber: number = this.buildingService.numberOfFloors$.value as number;

		// Generate array with all floors starting by 1
		const allFloors: Array<Number> = Array.from(
			{
				length: totalFloorsNumber
			},
			(_, acc) => acc + 1
		);
		const occupiedFloors: Array<Number> = this.occupiedFloors$.value;

		const currentElevatorFloor: Number = this.elevatorService.currentFloor$.value;

		const availableFloors: Array<Number> = allFloors.filter(
			(floor: Number) => !occupiedFloors.includes(floor) && floor !== currentElevatorFloor
		);

		const randomAvailableFloor: Number = availableFloors[Math.floor(Math.random() * availableFloors.length)];

		return randomAvailableFloor || null;
	}

	/**
	 * generateNewOccupant
	 *
	 * Add's new occupant to random available floor on building
	 */
	public generateNewOccupant(): void {
		const randomFloor: Number | null = this.getRandomAvailableFloor();

		if (randomFloor) {
			const newOccupiedFloors: Array<Number> = this.occupiedFloors$.value;

			newOccupiedFloors.push(randomFloor);
			this.occupiedFloors$.next(newOccupiedFloors);
		}

		// Schedules a new occupant to appear in desired moment
		setTimeout(() => this.generateNewOccupant(), this.appearInterval$.value);
	}

	/**
	 * handleElevatorArriving
	 *
	 * Handles elevator service arrive emitter, removing awaiting occupants from the recent reached floor
	 */
	public handleElevatorArriving(): void {
		this.elevatorService.arrived$.subscribe(
			(arrivalFloor: number) => {
				const occupiedFloors: Array<Number> = this.occupiedFloors$.value;
				// Gets the arrival floor index in occupied floors, if has any occupant
				const arrivalFloorIndex: number = occupiedFloors.indexOf(arrivalFloor);

				if (arrivalFloorIndex > -1) {
					occupiedFloors.splice(arrivalFloorIndex, 1);
					this.occupiedFloors$.next(occupiedFloors);
				}
			}
		);
	}

	/**
	 * changeOccupantsAppearInterval
	 *
	 * Changes the occupants appear interval timing
	 *
	 * @param interval - Interval in seconds
	 */
	public changeOccupantsAppearInterval(interval: number): void {
		if (interval > 0) {
			this.appearInterval$.next(interval);
		}
	}
}
