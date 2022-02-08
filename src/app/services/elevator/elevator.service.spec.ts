import { TestBed } from '@angular/core/testing';

import { ElevatorService } from './elevator.service';

describe('ElevatorService', () => {
	let service: ElevatorService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ElevatorService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('#call', () => {
		it('should add desired floor to pending requests list', () => {

		});

		it('should call #validateRequests', () => {

		});
	});

	describe('#travelPanel', () => {
		it('should return before change elevator doors state if door is already closed', () => {

		});

		it('should set elevator doors state as closed before call #shouldMove', () => {

		});

		it('should call #shouldMove', () => {

		});

		it('should call #goToFloor with given floor if #shouldMove returns true', () => {

		});
	});

	describe('#validateRequests', () => {
		it('should call #shouldMove', () => {

		});

		it('should call #goToFloor with desired floor if #shouldMove returns true', () => {

		});

		it('shouldn\'t call #goToFloor with desired floor if #shouldMove returns false', () => {

		});

		it('should call #goToFloor with first floor if pending request list is empty', () => {

		});

		it('should remove first pending request if has pending requests', () => {

		});

		it('should call #goToFloor with first pending request if has pending requests', () => {

		});
	});

	describe('#shouldMove', () => {
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

		it('shouldn\'t set elevator doors state as closed after five seconds, if elevator state is moving', () => {

		});

		it('should call #validateRequests after five seconds', () => {

		});
	});
});