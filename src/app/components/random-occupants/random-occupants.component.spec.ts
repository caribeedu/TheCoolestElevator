import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomOccupantService } from 'src/app/services/random-occupant/random-occupant.service';

import { RandomOccupantsComponent } from './random-occupants.component';

describe('RandomOccupantsComponent', () => {
	let component: RandomOccupantsComponent;
	let fixture: ComponentFixture<RandomOccupantsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RandomOccupantsComponent],
			providers: [RandomOccupantService]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RandomOccupantsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
