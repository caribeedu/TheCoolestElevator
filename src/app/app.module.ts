import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { BuildingComponent } from './components/building/building.component';
import { BuildingFloorComponent } from './components/building-floor/building-floor.component';
import { ElevatorComponent } from './components/elevator/elevator.component';
import { ElevatorPanelComponent } from './components/elevator-panel/elevator-panel.component';

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
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
