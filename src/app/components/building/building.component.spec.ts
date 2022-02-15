import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildingService } from 'src/app/services/building/building.service';

import { BuildingComponent } from './building.component';

describe('BuildingComponent', () => {
	let component: BuildingComponent;
	let fixture: ComponentFixture<BuildingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [BuildingService],
			declarations: [BuildingComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BuildingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
