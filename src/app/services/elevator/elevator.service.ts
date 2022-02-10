import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { ElevatorDirection, ElevatorDoor, ElevatorState, ElevatorCall } from '../../enum/elevator.enum';
import { IElevatorCall } from '../../interfaces/elevator.interface';

import { SoundService } from '../sound/sound.service';

@Injectable({
	providedIn: 'root'
})
export class ElevatorService {
	/* Floor call subscription */
	public readonly newFloorCall$: Subject<number> = new Subject<number>();
	/* Elevator panel call subscription */
	public readonly newPanelCall$: Subject<number> = new Subject<number>();

	/* Maximum number of calls that can be enqueued to pending requests */
	public readonly maximumPendingRequests: Number = 10;
	/* Pending floor calls */
	public readonly pendingRequests: Array<IElevatorCall> = [];

	/* Elevator doors state */
	public readonly doors$: BehaviorSubject<ElevatorDoor> = new BehaviorSubject<ElevatorDoor>(ElevatorDoor.CLOSED);
	/* Elevator movement state */
	public readonly movement$: BehaviorSubject<ElevatorState> = new BehaviorSubject<ElevatorState>(ElevatorState.STOPPED);
	/* Elevator movement direction state */
	public readonly movementDirection$: BehaviorSubject<ElevatorDirection> = new BehaviorSubject<ElevatorDirection>(ElevatorDirection.UPPING);
	/* Elevator current floor state */
	public readonly currentFloor$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

	constructor(public soundService: SoundService) {
		this.handleCalls();
	}

	/**
	 * handleCalls
	 *
	 * Handle new floor and panels elevator calls
	 */
	public handleCalls(): void {
		this.newFloorCall$.subscribe(
			(floor: number) => this.newCall(
				{
					type: ElevatorCall.FLOOR,
					floor
				}
			)
		);

		this.newPanelCall$.subscribe(
			(floor: number) => this.newCall(
				{
					type: ElevatorCall.PANEL,
					floor
				}
			)
		);
	}

	/**
	 * newCall
	 *
	 * Add elevator floor request to list pending
	 *
	 * @param call - Elevator call description
	 */
	public newCall(call: IElevatorCall): void {
		if (!this.canAddNewCall()) {
			this.soundService.warn();
			return;
		}

		if (call.type === ElevatorCall.PANEL) {
			const lastPanelCallIndex: number = this.pendingRequests.filter((request: IElevatorCall) => request.type === ElevatorCall.PANEL).length;
			this.pendingRequests.splice(lastPanelCallIndex, 0, call);
		}
		else if (call.type === ElevatorCall.FLOOR) {
			this.pendingRequests.push(call);
		}

		this.validateRequests();
	}

	/**
	 * canAddNewCall
	 *
	 * Validates current pending requests queue length in comparison of maximum requests allowed
	 */
	public canAddNewCall(): boolean {
		return this.pendingRequests.length < this.maximumPendingRequests;
	}

	/**
	 * validateRequests
	 *
	 * Validates if elevator can process next request and if should return to first floor
	 */
	public validateRequests(): void {
		if (!this.canMove()) {
			return;
		}

		if (this.pendingRequests.length) {
			this.goToFloor(
				this.pendingRequests[0].floor
			);
			// Removes first pending request from list
			this.pendingRequests.splice(0, 1);
		}
		else if (this.currentFloor$.value !== 1) {
			this.goToFloor(1);
		}
	}

	/**
	 * canMove
	 *
	 * Validate if elevator can move by the current state
	 *
	 * @returns Elevator can move
	 */
	public canMove(): boolean {
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

		this.soundService.bell();

		this.doors$.next(ElevatorDoor.OPENED);

		setTimeout(() => {
			this.doors$.next(ElevatorDoor.CLOSED);
			this.validateRequests();
		}, 5000);
	}
}
