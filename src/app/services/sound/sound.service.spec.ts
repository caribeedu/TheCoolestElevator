import { TestBed } from '@angular/core/testing';

import { SoundService } from './sound.service';

describe('SoundService', () => {
	let service: SoundService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(SoundService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('#validateSoundVolume', () => {
		it('should call Howler #volume with no params to get current sound', () => {

		});

		it('should call Howler #volume with 1 if current volume isn\'t 0.8', () => {

		});

		it('shouldn\'t call Howler #volume with 1 if current volume is 0.8', () => {

		});
	});

	describe('#bell', () => {
		it('should call #validateSoundVolume', () => {

		});

		it('should call bell sound #play', () => {

		});
	});

	describe('#warn', () => {
		it('should call #validateSoundVolume', () => {

		});

		it('should call warn sound #play', () => {

		});
	});
});
