import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { IndexComponent } from "./index.component";
import { PublicLayoutComponent } from "../shared/layouts/public-layout/public-layout.component";

const routes: Routes = [
	{
		path: "",
		component: PublicLayoutComponent,
		children: [
			{
				path: "",
				component: IndexComponent,
			},
		],
	},
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class IndexRoutingModule {}
