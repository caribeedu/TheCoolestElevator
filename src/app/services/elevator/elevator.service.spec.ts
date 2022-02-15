import { TestBed } from '@angular/core/testing';

import { ElevatorCall, ElevatorDirection, ElevatorDoor, ElevatorState } from '../../enum/elevator.enum';
import { IElevatorCall } from 'src/app/interfaces/elevator.interface';

import { ElevatorService } from './elevator.service';
import { SoundService } from '../sound/sound.service';

describe('ElevatorService', () => {
	let service: ElevatorService;
	let handleCallsSpy: jasmine.Spy;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SoundService]
		});

		// Spy method called in constructor
		handleCallsSpy = spyOn(ElevatorService.prototype, 'handleCalls');

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
		let floorSubSpy: jasmine.Spy;
		let panelSubSpy: jasmine.Spy;

		beforeEach(() => {
			handleCallsSpy.and.callThrough();

			floorSubSpy = spyOn(service.newFloorCall$, 'subscribe');
			panelSubSpy = spyOn(service.newPanelCall$, 'subscribe');
		});

		it('should subscribe to new floor calls', () => {
			service.handleCalls();

			expect(floorSubSpy).toHaveBeenCalled();
		});

		it('should subscribe to new elevator panel calls', () => {
			service.handleCalls();

			expect(panelSubSpy).toHaveBeenCalled();
		});

		it('should call #newCall with enum type PANEL and desired floor on new panel call', () => {
			panelSubSpy.and.callThrough();
			const spy: jasmine.Spy = spyOn(service, 'newCall');
			const floorDouble: number = 3;

			service.handleCalls();

			service.newPanelCall$.next(floorDouble);

			expect(spy).toHaveBeenCalledOnceWith({ type: ElevatorCall.PANEL, floor: floorDouble });
		});

		it('should call #newCall with enum type FLOOR and desired floor on new floor call', () => {
			floorSubSpy.and.callThrough();
			const spy: jasmine.Spy = spyOn(service, 'newCall');
			const floorDouble: number = 4;

			service.handleCalls();

			service.newFloorCall$.next(floorDouble);

			expect(spy).toHaveBeenCalledOnceWith({ type: ElevatorCall.FLOOR, floor: floorDouble });
		});
	})

	describe('#newCall', () => {
		let validateRequestsSpy: jasmine.Spy;

		beforeEach(() => {
			validateRequestsSpy = spyOn(service, 'validateRequests');
		});

		it('should call #canAddNewCall', () => {
			const spy: jasmine.Spy = spyOn(service, 'canAddNewCall');

			service.newCall({ type: ElevatorCall.FLOOR, floor: 2 });

			expect(spy).toHaveBeenCalled();
		});

		it('should call soundService #warn if #canAddNewCall returns false', () => {
			const spy: jasmine.Spy = spyOn(service.soundService, 'warn');
			spyOn(service, 'canAddNewCall').and.returnValue(false);

			service.newCall({ type: ElevatorCall.FLOOR, floor: 2 });

			expect(spy).toHaveBeenCalled();
		});

		it('shouldn\'t add new call to pending requests if #canAddNewCall returns false', () => {
			const spy: jasmine.Spy = spyOn(service.pendingRequests, 'push');
			spyOn(service, 'canAddNewCall').and.returnValue(false);

			service.newCall({ type: ElevatorCall.FLOOR, floor: 2 });

			expect(spy).not.toHaveBeenCalled();
		});

		it('should add new call to pending requests in start of list, after the existent panel calls (if them exist\'s), if call type is panel', () => {
			const pendingRequestsDouble: Array<IElevatorCall> = [
				{ type: ElevatorCall.PANEL, floor: 2 },
				{ type: ElevatorCall.FLOOR, floor: 2 }
			];

			Object.defineProperty(service, 'pendingRequests', { value: pendingRequestsDouble });
			spyOn(service, 'canAddNewCall').and.returnValue(true);

			service.newCall({ type: ElevatorCall.PANEL, floor: 3 });

			expect(service.pendingRequests).toEqual(
				[
					{ type: ElevatorCall.PANEL, floor: 2 },
					{ type: ElevatorCall.PANEL, floor: 3 },
					{ type: ElevatorCall.FLOOR, floor: 2 }
				]
			);
		});

		it('should add new call to pending requests in end of list, if call type is floor', () => {
			const pendingRequestsDouble: Array<IElevatorCall> = [
				{ type: ElevatorCall.PANEL, floor: 2 },
				{ type: ElevatorCall.FLOOR, floor: 2 }
			];

			Object.defineProperty(service, 'pendingRequests', { value: pendingRequestsDouble });
			spyOn(service, 'canAddNewCall').and.returnValue(true);

			service.newCall({ type: ElevatorCall.FLOOR, floor: 3 });

			expect(service.pendingRequests).toEqual(
				[
					{ type: ElevatorCall.PANEL, floor: 2 },
					{ type: ElevatorCall.FLOOR, floor: 2 },
					{ type: ElevatorCall.FLOOR, floor: 3 }
				]
			);
		});

		it('should call #validateRequests', () => {
			spyOn(service, 'canAddNewCall').and.returnValue(true);

			service.newCall({ type: ElevatorCall.FLOOR, floor: 3 });

			expect(validateRequestsSpy).toHaveBeenCalled();
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