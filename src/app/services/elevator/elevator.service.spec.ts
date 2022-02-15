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

		expect(service.maximumPendingRequests).toEqual(10);
		expect(service.pendingRequests).toEqual([]);

		expect(service.doors$.value).toEqual(ElevatorDoor.CLOSED);
		expect(service.movement$.value).toEqual(ElevatorState.STOPPED);
		expect(service.movementDirection$.value).toEqual(ElevatorDirection.UPPING);
		expect(service.currentFloor$.value).toEqual(1);
	});

	it('should call #handleCalls on class constructor', () => {
		expect(handleCallsSpy).toHaveBeenCalledTimes(1);
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
			Object.defineProperty(service, 'pendingRequests', { value: [] });
			Object.defineProperty(service, 'maximumPendingRequests', { value: 2 });

			expect(service.canAddNewCall()).toEqual(true);
		});

		it('should return false if pending requests length is equal to maximumPendingRequests', () => {
			Object.defineProperty(
				service,
				'pendingRequests',
				{
					value: [
						{ type: ElevatorCall.PANEL, floor: 2 }
					]
				}
			);
			Object.defineProperty(service, 'maximumPendingRequests', { value: 1 });

			expect(service.canAddNewCall()).toEqual(false);
		});
	});

	describe('#validateRequests', () => {
		let goToFloorSpy: jasmine.Spy;
		let canMoveSpy: jasmine.Spy;

		beforeEach(() => {
			goToFloorSpy = spyOn(service, 'goToFloor');
			canMoveSpy = spyOn(service, 'canMove');
		});

		it('shouldn\'t call #goToFloor if #canMove returns false', () => {
			service.currentFloor$.next(2);
			canMoveSpy.and.returnValue(false);

			service.validateRequests();

			expect(goToFloorSpy).not.toHaveBeenCalled();
		});

		it('should call #goToFloor with first floor if pending request list is empty and current floor isn\'t first', () => {
			service.currentFloor$.next(2);
			canMoveSpy.and.returnValue(true);

			Object.defineProperty(service, 'pendingRequests', { value: [] });

			service.validateRequests();

			expect(goToFloorSpy).toHaveBeenCalledOnceWith(1);
		});

		it('shouldn\'t call #goToFloor with first floor if pending request list is empty and current floor is first', () => {
			service.currentFloor$.next(1);
			canMoveSpy.and.returnValue(true);

			Object.defineProperty(service, 'pendingRequests', { value: [] });

			service.validateRequests();

			expect(goToFloorSpy).not.toHaveBeenCalled();
		});

		it('should remove first pending request if has pending requests', () => {
			canMoveSpy.and.returnValue(true);

			Object.defineProperty(
				service,
				'pendingRequests',
				{
					value: [
						{ type: ElevatorCall.PANEL, floor: 2 }
					]
				}
			);

			const spy: jasmine.Spy = spyOn(service.pendingRequests, 'splice');

			service.validateRequests();

			expect(spy).toHaveBeenCalledOnceWith(0, 1);
		});

		it('should call #goToFloor with first pending request if has pending requests', () => {
			canMoveSpy.and.returnValue(true);
			const floorDouble: number = 3;

			Object.defineProperty(
				service,
				'pendingRequests',
				{
					value: [
						{ type: ElevatorCall.PANEL, floor: floorDouble },
						{ type: ElevatorCall.PANEL, floor: floorDouble + 1 }
					]
				}
			);

			service.validateRequests();

			expect(goToFloorSpy).toHaveBeenCalledOnceWith(floorDouble);
		});
	});

	describe('#canMove', () => {
		it('should returns true is elevator state is stopped and doors state is closed', () => {
			service.movement$.next(ElevatorState.STOPPED);
			service.doors$.next(ElevatorDoor.CLOSED);

			expect(service.canMove()).toEqual(true);
		});

		it('should returns false is elevator state is stopped and doors state is open', () => {
			service.movement$.next(ElevatorState.STOPPED);
			service.doors$.next(ElevatorDoor.OPENED);

			expect(service.canMove()).toEqual(false);
		});

		it('should returns false is elevator state is moving and doors state is closed', () => {
			service.movement$.next(ElevatorState.MOVING);
			service.doors$.next(ElevatorDoor.CLOSED);

			expect(service.canMove()).toEqual(false);
		});
	});

	describe('#goToFloor', () => {
		let arriveSpy: jasmine.Spy;

		beforeEach(() => {
			arriveSpy = spyOn(service, 'arrive');
		});

		it('should set elevator state as moving', async () => {
			const spy: jasmine.Spy = spyOn(service.movement$, 'next');
			const floorDouble: number = 2;

			await service.goToFloor(floorDouble);

			expect(spy).toHaveBeenCalledWith(ElevatorState.MOVING);
		});

		it('should set elevator direction state as upping if given floor is greater than current floor', async () => {
			const spy: jasmine.Spy = spyOn(service.movementDirection$, 'next');
			const floorDouble: number = 2;

			service.currentFloor$.next(1);

			await service.goToFloor(floorDouble);

			expect(spy).toHaveBeenCalledWith(ElevatorDirection.UPPING);
		});

		it('should set elevator direction state as downing if given floor is less than current floor', async () => {
			const spy: jasmine.Spy = spyOn(service.movementDirection$, 'next');
			const floorDouble: number = 2;

			service.currentFloor$.next(4);

			await service.goToFloor(floorDouble);

			expect(spy).toHaveBeenCalledWith(ElevatorDirection.DOWNING);
		});

		it('should change elevator floor after one second by floor traveled', (done: DoneFn) => {
			service.currentFloor$.next(1);

			const spy: jasmine.Spy = spyOn(service.currentFloor$, 'next').and.callThrough();
			const floorDouble: number = 3;

			service.goToFloor(floorDouble).then(() => done());

			expect(spy).toHaveBeenCalledWith(2);

			setTimeout(() => expect(spy).toHaveBeenCalledWith(3), 1000);
		});

		it('should call #arrive after get final floor', async () => {
			const floorDouble: number = 2;
			service.currentFloor$.next(1);

			await service.goToFloor(floorDouble);

			expect(arriveSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe('#arrive', () => {
		let validateRequestsSpy: jasmine.Spy;

		beforeEach(() => {
			validateRequestsSpy = spyOn(service, 'validateRequests');
		});

		it('should set elevator state as stopped before set doors state as opened', () => {
			const stateSpy: jasmine.Spy = spyOn(service.movement$, 'next');
			const doorsSpy: jasmine.Spy = spyOn(service.doors$, 'next');

			service.arrive();

			expect(stateSpy).toHaveBeenCalledBefore(doorsSpy);
			expect(doorsSpy).toHaveBeenCalled();
		});

		it('should call soundService #bell', () => {
			const spy: jasmine.Spy = spyOn(service.soundService, 'bell');

			service.arrive();

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should set elevator doors state as open', () => {
			const doorsSpy: jasmine.Spy = spyOn(service.doors$, 'next');

			service.arrive();

			expect(doorsSpy).toHaveBeenCalledOnceWith(ElevatorDoor.OPENED);
		});

		it('should call arrived$ with the recent reached floor', () => {
			const finalFloorDouble: number = 4;
			const spy: jasmine.Spy = spyOn(service.arrived$, 'next');

			service.currentFloor$.next(finalFloorDouble);

			service.arrive();

			expect(spy).toHaveBeenCalledOnceWith(finalFloorDouble);
		});

		it('should set elevator doors state as closed after five seconds', () => {
			const spy: jasmine.Spy = spyOn(service.doors$, 'next');

			jasmine.clock().install();

			service.arrive();

			jasmine.clock().tick(5000);
			jasmine.clock().uninstall();

			expect(spy).toHaveBeenCalledWith(ElevatorDoor.CLOSED);
		});

		it('should call #validateRequests after five seconds', () => {
			jasmine.clock().install();

			service.arrive();

			expect(validateRequestsSpy).not.toHaveBeenCalled();

			jasmine.clock().tick(5000);
			jasmine.clock().uninstall();

			expect(validateRequestsSpy).toHaveBeenCalledTimes(1);
		});
	});
});