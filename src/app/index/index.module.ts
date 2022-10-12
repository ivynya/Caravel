import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IndexRoutingModule } from "./index-routing.module";

import { IndexComponent } from "./index.component";

import { ButtonModule, IconModule } from "carbon-components-angular";

@NgModule({
	declarations: [IndexComponent],
	imports: [CommonModule, IndexRoutingModule, ButtonModule, IconModule],
	providers: [],
})
export class IndexModule {}
