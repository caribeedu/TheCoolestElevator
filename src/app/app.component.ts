import { Component } from '@angular/core';

@Component({
	selector: 'tce-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	/* Total number of floors */
	public readonly floors: Number = 5;
}
