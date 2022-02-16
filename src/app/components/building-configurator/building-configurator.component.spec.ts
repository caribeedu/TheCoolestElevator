import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { RandomOccupantService } from 'src/app/services/random-occupant/random-occupant.service';

import { BuildingConfiguratorComponent } from './building-configurator.component';

describe('BuildingConfiguratorComponent', () => {
	let component: BuildingConfiguratorComponent;
	let fixture: ComponentFixture<BuildingConfiguratorComponent>;
	let onInitSpy: jasmine.Spy;

	beforeEach(
		async () => {
			await TestBed.configureTestingModule({
				declarations: [BuildingConfiguratorComponent],
				providers: [RandomOccupantService],
				imports: [ReactiveFormsModule]
			}).compileComponents();
		}
	);

	beforeEach(() => {
		onInitSpy = spyOn(BuildingConfiguratorComponent.prototype, 'ngOnInit');

		fixture = TestBed.createComponent(BuildingConfiguratorComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();

		expect(component.paramsForm).toBeUndefined();
	});

	describe('#ngOnInit', () => {
		let initFormSpy: jasmine.Spy;

		beforeEach(() => {
			initFormSpy = spyOn(component, 'initForm');

			onInitSpy.and.callThrough();
			component.ngOnInit();
		});

		it('should call #initForm', () => {
			expect(initFormSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe('#initForm', () => {
		it('should define form group with default randomOccupantsService values', () => {
			const appearIntervalDouble: number = 5;

			spyOnProperty(component.randomOccupantsService.appearInterval$, 'value').and.returnValue(appearIntervalDouble);

			component.initForm();

			expect(component.paramsForm).toBeInstanceOf(FormGroup);
			expect(component.paramsForm?.controls.occupantsAppearInterval).toBeInstanceOf(FormControl);

			expect(component.paramsForm?.value).toEqual({ occupantsAppearInterval: appearIntervalDouble });
		});
	});

	describe('#updateParams', () => {
		beforeEach(() => {
			component.initForm();
		});

		it('should call randomOccupantsService #changeOccupantsAppearInterval with appear interval form control value', () => {
			const appearIntervalDouble: number = 5;

			Object.defineProperty(component.paramsForm, 'value', { value: { occupantsAppearInterval: appearIntervalDouble } });

			const spy: jasmine.Spy = spyOn(component.randomOccupantsService, 'changeOccupantsAppearInterval');

			component.updateParams();

			expect(spy).toHaveBeenCalledOnceWith(appearIntervalDouble);
		});

		it('should call randomOccupantsService #changeOccupantsAppearInterval with zero if appear interval form control hasn\'t value', () => {
			Object.defineProperty(component.paramsForm, 'value', { value: { occupantsAppearInterval: undefined } });

			const spy: jasmine.Spy = spyOn(component.randomOccupantsService, 'changeOccupantsAppearInterval');

			component.updateParams();

			expect(spy).toHaveBeenCalledOnceWith(0);
		});
	});
});
