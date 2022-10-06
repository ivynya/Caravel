import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CourseRoutingModule } from "./course-routing.module";

import { CourseComponent } from "./course.component";
import { SharedModule } from "../_shared/shared.module";
import { CoreModule } from "../_core/core.module";

import { ConvertUrlPipe, RoundDatePipe } from "../_core/pipes";
import { CourseNavComponent } from "./course-nav/course-nav.component";
import { CourseHomeComponent } from "./course-home/course-home.component";
import { CourseModulesComponent } from "./course-modules/course-modules.component";
import { CoursePageComponent } from "./course-page/course-page.component";
import { CourseAnnouncementComponent } from "./course-announcement/course-announcement.component";
import { CourseAnnouncementsComponent } from "./course-announcements/course-announcements.component";
import { CourseDiscussionsComponent } from "./course-discussions/course-discussions.component";
import {
	BreadcrumbModule,
	ButtonModule,
	DialogModule,
	IconModule,
	InputModule,
	ModalModule,
	SideNavModule,
	TilesModule,
} from "carbon-components-angular";
import { CoursesComponent } from "./courses/courses.component";
import { CourseAssignmentsComponent } from "./course-assignments/course-assignments.component";

@NgModule({
	declarations: [
		CourseComponent,
		CoursesComponent,
		CourseNavComponent,
		CourseHomeComponent,
		CourseModulesComponent,
		CoursePageComponent,
		CourseAnnouncementComponent,
		CourseAnnouncementsComponent,
		CourseAssignmentsComponent,
		CourseDiscussionsComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		CourseRoutingModule,
		CoreModule,
		SideNavModule,
		IconModule,
		TilesModule,
		DialogModule,
		ButtonModule,
		BreadcrumbModule,
		ModalModule,
		InputModule,
	],
	providers: [ConvertUrlPipe, RoundDatePipe],
})
export class CourseModule {}
