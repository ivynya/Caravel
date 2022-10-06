import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TranslateModule } from "@ngx-translate/core";

import {
	AssignmentComponent,
	DiscussionComponent,
	ExpandableComponent,
	ModuleComponent,
	NotificationBannerComponent,
	OpenFromHereComponent,
	PageNotFoundComponent,
	TodoComponent,
	ToggleComponent,
} from "./components";

import { PrivateLayoutComponent, PublicLayoutComponent } from "./layouts";

import {
	ButtonModule,
	DropdownModule,
	HeaderModule,
	IconModule,
	ModalModule,
	NotificationModule,
	PanelModule,
	TilesModule,
} from "carbon-components-angular";

import { WebviewDirective } from "./directives";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CoreModule } from "../_core/core.module";

@NgModule({
	declarations: [
		PageNotFoundComponent,
		WebviewDirective,
		ModuleComponent,
		NotificationBannerComponent,
		TodoComponent,
		ToggleComponent,
		ExpandableComponent,
		AssignmentComponent,
		DiscussionComponent,
		OpenFromHereComponent,
		PublicLayoutComponent,
		PrivateLayoutComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		TranslateModule,
		FormsModule,
		CoreModule,
		HeaderModule,
		PanelModule,
		TilesModule,
		DropdownModule,
		IconModule,
		NotificationModule,
		ModalModule,
		ButtonModule,
	],
	exports: [
		TranslateModule,
		WebviewDirective,
		FormsModule,
		ModuleComponent,
		NotificationBannerComponent,
		TodoComponent,
		ToggleComponent,
		ExpandableComponent,
		AssignmentComponent,
		DiscussionComponent,
		OpenFromHereComponent,
	],
})
export class SharedModule {}
