import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AccountComponent } from "./account.component";
import { PrivateLayoutComponent } from "../_shared/layouts";

const routes: Routes = [
	{
		path: "account",
		component: PrivateLayoutComponent,
		children: [
			{
				path: "",
				component: AccountComponent,
			},
		],
	},
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AccountRoutingModule {}
