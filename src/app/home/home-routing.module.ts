import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { PrivateLayoutComponent } from "../shared/layouts";

const routes: Routes = [
	{
		path: "home",
		component: PrivateLayoutComponent,
		children: [
			{
				path: "",
				component: HomeComponent,
			},
		],
	},
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomeRoutingModule {}
