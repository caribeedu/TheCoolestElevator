import { TestBed } from '@angular/core/testing';

import { ElevatorDirection, ElevatorDoor, ElevatorState } from '../../enum/elevator.enum';

import { ElevatorService } from './elevator.service';

describe('ElevatorService', () => {
	let service: ElevatorService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ElevatorService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();

		expect(service.pendingRequests).toEqual([]);

		expect(service.doors$.value).toEqual(ElevatorDoor.CLOSED);
		expect(service.movement$.value).toEqual(ElevatorState.STOPPED);
		expect(service.movementDirection$.value).toEqual(ElevatorDirection.UPPING);
		expect(service.currentFloor$.value).toEqual(1);
	});

	describe('#handleCalls', () => {
		it('should subscribe to new floor calls', () => {

		});

		it('should subscribe to new elevator panel calls', () => {

		});

		it('should call #newCall with enum type PANEL and desired floor on new panel call', () => {

		});

		it('should call #newCall with enum type FLOOR and desired floor on new floor call', () => {

		});
	})

	describe('#newCall', () => {
		it('should add new call to pending requests in start of list, sorted descended by floor number, if call type is panel and movement direction is downing', () => {

		});

		it('should add new call to pending requests in start of list, sorted ascended by floor number, if call type is panel and movement direction is upping', () => {

		});

		it('should add new call to pending requests in end of list if call type is floor', () => {

		});

		it('should call #validateRequests', () => {

		});
	});

	describe('#validateRequests', () => {
		it('should return if #canMove returns false', () => {

		});

		it('should call #goToFloor with first floor if pending request list is empty', () => {

		});

		it('should remove first pending request if has pending requests', () => {

		});

		it('should call #goToFloor with first pending request if has pending requests', () => {

		});
	});

	describe('#canMove', () => {
		it('should returns true is elevator state is stopped and doors state is closed', () => {

		});

		it('should returns false is elevator state is stopped and doors state is open', () => {

		});

		it('should returns false is elevator state is moving and doors state is closed', () => {

		});
	});

	describe('#goToFloor', () => {
		it('should set elevator state as moving', () => {

		});

		it('should set elevator direction state as upping if given floor is greater than current floor', () => {

		});

		it('should set elevator direction state as downing if given floor is less than current floor', () => {

		});

		it('should change elevator floor after one second by floor traveled', () => {

		});

		it('should call #arrive after get final floor', () => {

		});
	});

	describe('#arrive', () => {
		it('should set elevator state as stopped before set doors state as opened', () => {

		});

		it('should set elevator doors state as open', () => {

		});

		it('should set elevator doors state as closed after five seconds, if elevator state is stopped', () => {

		});

		it('should call #validateRequests after five seconds', () => {

		});
	});
});