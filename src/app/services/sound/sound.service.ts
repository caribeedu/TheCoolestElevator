import { Injectable } from '@angular/core';

import { Howl, Howler } from 'howler';

@Injectable({
	providedIn: 'root'
})
export class SoundService {
	/* Bell sound asset instance */
	public readonly bellSound: Howl = new Howl({ src: '../../../assets/sounds/elevator_bell.mp3' });
	/* Warn sound asset instance */
	public readonly warnSound: Howl = new Howl({ src: '../../../assets/sounds/elevator_error.mp3' });

	/**
	 * validateSoundVolume
	 *
	 * Set's the sound volume to default if aren't
	 */
	public validateSoundVolume(): void {
		const currentVolume: number = Howler.volume();

		if (currentVolume !== 0.8) {
			Howler.volume(0.8);
		}
	}

	/**
	 * bell
	 *
	 * Play's the bell sound
	 */
	public bell(): void {
		this.validateSoundVolume();
		this.bellSound.play();
	}

	/**
	 * warn
	 *
	 * Play's the warn sound
	 */
	public warn(): void {
		this.validateSoundVolume();
		this.warnSound.play();
	}
}
