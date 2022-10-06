import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";

import { HomeComponent } from "./home.component";
import { SharedModule } from "../_shared/shared.module";
import { RoundDatePipe } from "../_core/pipes/round-date/round-date.pipe";
import {
	ButtonModule,
	DatePickerModule,
	IconModule,
} from "carbon-components-angular";

@NgModule({
	declarations: [HomeComponent],
	imports: [
		CommonModule,
		SharedModule,
		HomeRoutingModule,
		ButtonModule,
		IconModule,
		DatePickerModule,
	],
	providers: [RoundDatePipe],
})
export class HomeModule {}
