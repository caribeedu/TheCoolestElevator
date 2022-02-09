import { ElevatorCall } from '../enum/elevator.enum';

export interface IElevatorCall {
	/* Final destiny floor */
	floor: number;
	/* Elevator call origin type */
	type: ElevatorCall;
}