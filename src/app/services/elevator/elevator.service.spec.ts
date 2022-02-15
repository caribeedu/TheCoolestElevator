import { TestBed } from '@angular/core/testing';

import { ElevatorDirection, ElevatorDoor, ElevatorState } from '../../enum/elevator.enum';

import { ElevatorService } from './elevator.service';
import { SoundService } from '../sound/sound.service';

describe('ElevatorService', () => {
	let service: ElevatorService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SoundService]
		});
		service = TestBed.inject(ElevatorService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();

		expect(service.newFloorCall$).toBeDefined();
		expect(service.newPanelCall$).toBeDefined();
		expect(service.arrived$).toBeDefined();

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
		it('should call #canAddNewCall', () => {

		});

		it('should call soundService #warn if #canAddNewCall returns false', () => {

		});

		it('shouldn\'t add new call to pending requests if #canAddNewCall returns false', () => {

		});

		it('should add new call to pending requests in start of list, after the existent panel calls (if them exist\'s), if call type is panel', () => {

		});

		it('should add new call to pending requests in end of list, if call type is floor', () => {

		});

		it('should call #validateRequests', () => {

		});
	});

	describe('#canAddNewCall', () => {
		it('should return true if pending requests length is less than maximumPendingRequests', () => {

		});

		it('should return false if pending requests length is equal to maximumPendingRequests', () => {

		});
	});

	describe('#validateRequests', () => {
		it('should return if #canMove returns false', () => {

		});

		it('should call #goToFloor with first floor if pending request list is empty and current floor isn\'t first', () => {

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

		it('should call soundService #bell', () => {

		});

		it('should set elevator doors state as open', () => {

		});

		it('should call arrived$ with the recent reached floor', () => {

		});

		it('should set elevator doors state as closed after five seconds, if elevator state is stopped', () => {

		});

		it('should call #validateRequests after five seconds', () => {

		});
	});
});