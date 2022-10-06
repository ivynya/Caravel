import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { CoursesComponent } from "./courses/courses.component";

import { CourseComponent } from "./course.component";
import { CourseAnnouncementComponent } from "./course-announcement/course-announcement.component";
import { CourseAnnouncementsComponent } from "./course-announcements/course-announcements.component";
import { AssignmentComponent } from "./course-assignment/assignment.component";
import { CourseAssignmentsComponent } from "./course-assignments/course-assignments.component";
import { CourseDiscussionsComponent } from "./course-discussions/course-discussions.component";
import { CourseHomeComponent } from "./course-home/course-home.component";
import { CourseModulesComponent } from "./course-modules/course-modules.component";
import { CoursePageComponent } from "./course-page/course-page.component";
import { PageNotFoundComponent } from "../_shared/components";
import { PrivateLayoutComponent } from "../_shared/layouts";

const routes: Routes = [
	{
		path: "courses",
		component: PrivateLayoutComponent,
		children: [
			{
				path: "",
				component: CoursesComponent,
			},
			{
				path: ":id",
				component: CourseComponent,
				children: [
					{
						path: "",
						component: CourseHomeComponent,
					},
					{
						path: "announcements",
						component: CourseAnnouncementsComponent,
					},
					{
						path: "announcements/:tId",
						component: CourseAnnouncementComponent,
					},
					{
						path: "assignments",
						component: CourseAssignmentsComponent,
					},
					{
						path: "assignments/:aId",
						component: AssignmentComponent,
					},
					{
						path: "discussions",
						component: CourseDiscussionsComponent,
					},
					{
						path: "grades",
						component: PageNotFoundComponent,
					},
					{
						path: "modules",
						component: CourseModulesComponent,
					},
					{
						path: "modules/:mId",
						component: CourseModulesComponent,
					},
					{
						path: "quizzes",
						component: PageNotFoundComponent,
					},
					{
						path: "pages/:pId",
						component: CoursePageComponent,
					},
				],
			},
		],
	},
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CourseRoutingModule {}
