import { TestBed } from '@angular/core/testing';
import { Howl, Howler } from 'howler';

import { SoundService } from './sound.service';

describe('SoundService', () => {
	let service: SoundService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(SoundService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();

		expect(service.bellSound).toBeDefined();
		expect(service.bellSound).toBeInstanceOf(Howl);
		expect(service.warnSound).toBeDefined();
		expect(service.warnSound).toBeInstanceOf(Howl);
	});

	describe('#validateSoundVolume', () => {
		it('should call Howler #volume with no params to get current sound', () => {
			const spy: jasmine.Spy = spyOn(Howler, 'volume');

			service.validateSoundVolume();

			expect(spy).toHaveBeenCalledWith();
		});

		it('should call Howler #volume with 0.8 if current volume isn\'t 0.8', () => {
			Howler.volume(1);

			const spy: jasmine.Spy = spyOn(Howler, 'volume').and.callThrough();

			service.validateSoundVolume();

			expect(spy).toHaveBeenCalledWith(0.8);
		});

		it('shouldn\'t call Howler #volume if current volume is 0.8', () => {
			Howler.volume(0.8);

			const spy: jasmine.Spy = spyOn(Howler, 'volume').and.callThrough();

			service.validateSoundVolume();

			expect(spy).not.toHaveBeenCalledWith(0.8);
		});
	});

	describe('#bell', () => {
		it('should call #validateSoundVolume', () => {
			const spy: jasmine.Spy = spyOn(service, 'validateSoundVolume');

			service.bell();

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should call bell sound #play', () => {
			const spy: jasmine.Spy = spyOn(service.bellSound, 'play');

			service.bell();

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('#warn', () => {
		it('should call #validateSoundVolume', () => {
			const spy: jasmine.Spy = spyOn(service, 'validateSoundVolume');

			service.warn();

			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should call warn sound #play', () => {
			const spy: jasmine.Spy = spyOn(service.warnSound, 'play');

			service.warn();

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});
});
