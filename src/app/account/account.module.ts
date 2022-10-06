import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountRoutingModule } from "./account-routing.module";

import { AccountComponent } from "./account.component";
import { SharedModule } from "../_shared/shared.module";
import { ConfiguratorComponent } from "./configurator/configurator.component";
import {
	ButtonModule,
	DialogModule,
	IconModule,
	InputModule,
	ModalModule,
	SelectModule,
	TilesModule,
	ToggleModule,
} from "carbon-components-angular";
import { QRCodeModule } from "angularx-qrcode";

@NgModule({
	declarations: [AccountComponent, ConfiguratorComponent],
	imports: [
		CommonModule,
		SharedModule,
		QRCodeModule,
		AccountRoutingModule,
		TilesModule,
		IconModule,
		InputModule,
		ToggleModule,
		SelectModule,
		ButtonModule,
		DialogModule,
		ModalModule,
	],
})
export class AccountModule {}
