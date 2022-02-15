import { TestBed } from '@angular/core/testing';

import { RandomOccupantService } from './random-occupant.service';

describe('RandomOccupantService', () => {
	let service: RandomOccupantService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RandomOccupantService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('#getRandomAvailableFloor', () => {
		it('should return a existing floor number in the building with no occupants', () => {

		});

		it('shouldn\'t return the floor that elevator is in', () => {

		});

		it('should return null if hasn\'t any available floor', () => {

		});
	});

	describe('#generateNewOccupant', () => {
		it('should call #getRandomAvailableFloor', () => {

		});

		it('should call occupants$ #next with the current occupants floors plus the floor number of new occupant', () => {

		});

		it('shouldn\'t call occupants$ #next if #getRandomAvailableFloor returns null', () => {

		});

		it('should call #generateNewOccupant after desired appearInterval$ value in seconds', () => {

		});
	});

	describe('#handleElevatorArriving', () => {
		it('should subscribe to elevatorService arrive$ event', () => {

		});

		it('should call occupants$ #next with the current occupants floors minus the floor number of elevator arrived, if has any occupant', () => {

		});

		it('shouldn\'t call occupants$ #next with the floor number of elevator arrived, if hasn\'t any occupant', () => {

		});
	});

	describe('#changeOccupantsAppearInterval', () => {
		it('should call appearInterval$ #next with the new appear interval seconds', () => {

		});

		it('shouldn\'t call appearInterval$ #next if the new appear interval seconds is zero', () => {

		});
	});
});
