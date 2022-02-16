import { TestBed } from '@angular/core/testing';

import { BuildingService } from '../building/building.service';
import { ElevatorService } from '../elevator/elevator.service';

import { RandomOccupantService } from './random-occupant.service';

describe('RandomOccupantService', () => {
	let service: RandomOccupantService;
	let handleArrivingSpy: jasmine.Spy;
	let generateOccupantSpy: jasmine.Spy;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ElevatorService,
				BuildingService
			]
		});

		// Spy methods called in constructor
		handleArrivingSpy = spyOn(RandomOccupantService.prototype, 'handleElevatorArriving');
		generateOccupantSpy = spyOn(RandomOccupantService.prototype, 'generateNewOccupant');

		service = TestBed.inject(RandomOccupantService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();

		expect(service.appearInterval$.value).toEqual(15);
		expect(service.occupiedFloors$.value).toEqual([]);
	});

	it('should call #handleElevatorArriving on class constructor before #generateNewOccupant', () => {
		expect(handleArrivingSpy).toHaveBeenCalledBefore(generateOccupantSpy);
	});

	it('should call #generateNewOccupant on class constructor', () => {
		expect(generateOccupantSpy).toHaveBeenCalled();
	});

	describe('#getRandomAvailableFloor', () => {
		it('should return a existing floor number in the building with no occupants', () => {
			spyOnProperty(service.buildingService.numberOfFloors$, 'value').and.returnValue(3);
			spyOnProperty(service.elevatorService.currentFloor$, 'value').and.returnValue(1);
			spyOnProperty(service.occupiedFloors$, 'value').and.returnValue([3]);

			expect(service.getRandomAvailableFloor()).toEqual(2);
		});

		it('shouldn\'t return the floor that elevator is in', () => {
			spyOnProperty(service.buildingService.numberOfFloors$, 'value').and.returnValue(2);
			spyOnProperty(service.elevatorService.currentFloor$, 'value').and.returnValue(2);
			spyOnProperty(service.occupiedFloors$, 'value').and.returnValue([]);

			expect(service.getRandomAvailableFloor()).not.toEqual(2);
		});

		it('should return null if hasn\'t any available floor', () => {
			spyOnProperty(service.buildingService.numberOfFloors$, 'value').and.returnValue(2);
			spyOnProperty(service.elevatorService.currentFloor$, 'value').and.returnValue(2);
			spyOnProperty(service.occupiedFloors$, 'value').and.returnValue([1]);

			expect(service.getRandomAvailableFloor()).toEqual(null);
		});
	});

	describe('#generateNewOccupant', () => {
		let getRandomFloorSpy: jasmine.Spy;
		let occupiedFloorsSpy: jasmine.Spy;

		beforeEach(() => {
			generateOccupantSpy.and.callThrough();

			getRandomFloorSpy = spyOn(service, 'getRandomAvailableFloor');
			occupiedFloorsSpy = spyOn(service.occupiedFloors$, 'next');
		});

		it('should call #getRandomAvailableFloor', () => {
			service.generateNewOccupant();

			expect(getRandomFloorSpy).toHaveBeenCalledTimes(1);
		});

		it('should call occupiedFloors$ #next with the current occupants floors plus the floor number of new occupant', () => {
			const randomFloorDouble: number = 2;

			getRandomFloorSpy.and.returnValue(randomFloorDouble);
			spyOnProperty(service.occupiedFloors$, 'value').and.returnValue([]);

			service.generateNewOccupant();

			expect(occupiedFloorsSpy).toHaveBeenCalledOnceWith([randomFloorDouble]);
		});

		it('shouldn\'t call occupiedFloors$ #next if #getRandomAvailableFloor returns null', () => {
			getRandomFloorSpy.and.returnValue(null);

			service.generateNewOccupant();

			expect(occupiedFloorsSpy).not.toHaveBeenCalled();
		});

		it('should call #generateNewOccupant after desired appearInterval$ value in seconds', () => {
			getRandomFloorSpy.and.returnValue(null);

			jasmine.clock().install();

			service.generateNewOccupant();

			jasmine.clock().tick(service.appearInterval$.value * 1000);

			jasmine.clock().uninstall();

			// Called on constructor, here and inside of this same method after timeout
			expect(generateOccupantSpy).toHaveBeenCalledTimes(3);
		});
	});

	describe('#handleElevatorArriving', () => {
		it('should subscribe to elevatorService arrived$ event', () => {
			handleArrivingSpy.and.callThrough();

			const spy: jasmine.Spy = spyOn(service.elevatorService.arrived$, 'subscribe');

			service.handleElevatorArriving();

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should call occupiedFloors$ #next with the current occupants floors minus the floor number of elevator arrived, if has any occupant', () => {
			handleArrivingSpy.and.callThrough();

			const floorDouble: number = 2;

			spyOnProperty(service.occupiedFloors$, 'value').and.returnValue([floorDouble + 1, floorDouble, floorDouble + 2]);
			const spy: jasmine.Spy = spyOn(service.occupiedFloors$, 'next');

			service.handleElevatorArriving();

			service.elevatorService.arrived$.next(floorDouble);

			expect(spy).toHaveBeenCalledOnceWith([floorDouble + 1, floorDouble + 2]);
		});

		it('shouldn\'t call occupiedFloors$ #next with the floor number of elevator arrived, if hasn\'t any occupant', () => {
			handleArrivingSpy.and.callThrough();

			const floorDouble: number = 2;

			spyOnProperty(service.occupiedFloors$, 'value').and.returnValue([floorDouble + 1, floorDouble + 2]);
			const spy: jasmine.Spy = spyOn(service.occupiedFloors$, 'next');

			service.handleElevatorArriving();

			service.elevatorService.arrived$.next(floorDouble);

			expect(spy).not.toHaveBeenCalled();
		});
	});

	describe('#changeOccupantsAppearInterval', () => {
		let appearIntervalSpy: jasmine.Spy;

		beforeEach(() => {
			appearIntervalSpy = spyOn(service.appearInterval$, 'next');
		});

		it('should call appearInterval$ #next with the new appear interval seconds', () => {
			const intervalDouble: number = 5;

			service.changeOccupantsAppearInterval(intervalDouble);

			expect(appearIntervalSpy).toHaveBeenCalledOnceWith(intervalDouble);
		});

		it('shouldn\'t call appearInterval$ #next if the new appear interval seconds is zero', () => {
			const intervalDouble: number = 0;

			service.changeOccupantsAppearInterval(intervalDouble);

			expect(appearIntervalSpy).not.toHaveBeenCalled();
		});
	});
});
