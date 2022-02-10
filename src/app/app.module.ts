import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { BuildingComponent } from './components/building/building.component';
import { BuildingFloorComponent } from './components/building-floor/building-floor.component';
import { ElevatorComponent } from './components/elevator/elevator.component';
import { ElevatorPanelComponent } from './components/elevator-panel/elevator-panel.component';

import { ElevatorService } from './services/elevator/elevator.service';
import { BuildingService } from './services/building/building.service';
import { SoundService } from './services/sound/sound.service';

@NgModule({
	declarations: [
		AppComponent,
		BuildingComponent,
		BuildingFloorComponent,
		ElevatorComponent,
		ElevatorPanelComponent
	],
	imports: [
		BrowserModule
	],
	providers: [
		ElevatorService,
		BuildingService,
		SoundService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
