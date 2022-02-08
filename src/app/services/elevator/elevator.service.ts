import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ElevatorDirection, ElevatorDoor, ElevatorState } from '../../enum/elevator.enum';

@Injectable({
	providedIn: 'root'
})
export class ElevatorService {
	/* Pending floor calls */
	public readonly pendingRequests: Array<number> = [];
	/* Elevator doors state */
	public readonly doors$: BehaviorSubject<ElevatorDoor> = new BehaviorSubject<ElevatorDoor>(ElevatorDoor.CLOSED);
	/* Elevator movement state */
	public readonly movement$: BehaviorSubject<ElevatorState> = new BehaviorSubject<ElevatorState>(ElevatorState.STOPPED);
	/* Elevator movement direction state */
	public readonly movementDirection$: BehaviorSubject<ElevatorDirection> = new BehaviorSubject<ElevatorDirection>(ElevatorDirection.UPPING);
	/* Elevator current floor state */
	public readonly currentFloor$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

	/**
	 * call
	 *
	 * Add elevator floor request to list pending
	 *
	 * @param floor - Floor number
	 */
	public call(floor: number): void {
		this.pendingRequests.push(floor);
		this.validateRequests();
	}

	/**
	 * travelPanel
	 *
	 * Travels through floors using elevator panel
	 *
	 * @param floor  - Floor number
	 */
	public travelPanel(floor: number): void {
		if (this.doors$.value === ElevatorDoor.CLOSED) {
			this.pendingRequests.unshift(floor);
			return;
		}

		this.doors$.next(ElevatorDoor.CLOSED);

		if (this.shouldMove()) {
			this.goToFloor(floor);
		}
	}

	/**
	 * validateRequests
	 *
	 * Validate if elevator can process next request and if should return to first floor
	 */
	public validateRequests(): void {
		if (!this.shouldMove()) {
			return;
		}

		if (this.pendingRequests.length) {
			this.goToFloor(
				this.pendingRequests[0]
			);
			// Removes first pending request from list
			this.pendingRequests.splice(0, 1);
		}
		else {
			this.goToFloor(1);
		}
	}

	/**
	 * shouldMove
	 *
	 * Validate if elevator can move by the current state
	 *
	 * @returns Elevator can move
	 */
	public shouldMove(): boolean {
		return this.movement$.value === ElevatorState.STOPPED && this.doors$.value === ElevatorDoor.CLOSED;
	}

	/**
	 * goToFloor
	 *
	 * Changes elevator behavior states and moves him
	 *
	 * @param finalFloor - Desired final floor
	 */
	public async goToFloor(finalFloor: number): Promise<void> {
		this.movement$.next(ElevatorState.MOVING);

		if (finalFloor > this.currentFloor$.value) {
			this.movementDirection$.next(ElevatorDirection.UPPING);
		}
		else {
			this.movementDirection$.next(ElevatorDirection.DOWNING);
		}

		// Calculate floor difference using elevator movement direction
		const floorDifference: number = this.movementDirection$.value === ElevatorDirection.UPPING ?
			finalFloor - this.currentFloor$.value :
			this.currentFloor$.value - finalFloor;

		// Changes elevator floor at each second
		for (let i = 0; i < floorDifference; i++) {
			this.currentFloor$.next(
				this.movementDirection$.value === ElevatorDirection.UPPING ? this.currentFloor$.value + 1 : this.currentFloor$.value - 1
			);

			await new Promise<void>((res: Function, _: Function) => setTimeout(res, 1000));
		}

		this.arrive();
	}

	/**
	 * arrive
	 *
	 * Stops the elevator, open the door and await for next step. If nothing's happen, goes to the next request
	 */
	public arrive(): void {
		this.movement$.next(ElevatorState.STOPPED);
		this.doors$.next(ElevatorDoor.OPENED);

		setTimeout(() => {
			if (this.movement$.value === ElevatorState.STOPPED) {
				this.doors$.next(ElevatorDoor.CLOSED);
			}

			this.validateRequests();
		}, 5000);
	}
}
