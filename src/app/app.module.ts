import "reflect-metadata";
import "../polyfills";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

import { AppRoutingModule } from "./app-routing.module";

// NG Translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AuthModule } from "./auth/auth.module";
import { AccountModule } from "./account/account.module";
import { AssignmentModule } from "./course/course-assignment/assignment.module";
import { CourseModule } from "./course/course.module";
import { HomeModule } from "./home/home.module";
import { InboxModule } from "./inbox/inbox.module";
import { IndexModule } from "./index/index.module";

import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { AppConfig } from "../environments/environment";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		CoreModule,
		SharedModule,
		AuthModule,
		AccountModule,
		AssignmentModule,
		CourseModule,
		HomeModule,
		InboxModule,
		IndexModule,
		AppRoutingModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
		ServiceWorkerModule.register("ngsw-worker.js", {
			enabled: AppConfig.production,
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
