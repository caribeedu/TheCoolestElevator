import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingConfiguratorComponent } from './building-configurator.component';

describe('BuildingConfiguratorComponent', () => {
	let component: BuildingConfiguratorComponent;
	let fixture: ComponentFixture<BuildingConfiguratorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BuildingConfiguratorComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BuildingConfiguratorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('#ngOnInit', () => {
		it('should call #initForms', () => {

		});
	});

	describe('#initForms', () => {
		it('should define form group with default randomOccupantsService values', () => {

		});
	});

	describe('#updateParams', () => {
		it('should call randomOccupantsService #changeOccupantsAppearInterval with appear interval form control value', () => {

		});
	});
});
