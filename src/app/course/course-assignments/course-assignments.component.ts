import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CourseService, UserService } from "../../_core/services/canvas";
import { Assignment, Course } from "../../_core/schemas";

@Component({
	selector: "app-course-assignments",
	templateUrl: "./course-assignments.component.html",
	styleUrls: ["./course-assignments.component.scss"],
})
export class CourseAssignmentsComponent implements OnInit {
	course: Course;
	assignments: Assignment[];
	private _assignments: Assignment[][] = [];

	constructor(
		private courseService: CourseService,
		private route: ActivatedRoute,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.route.parent.params.subscribe((params) => {
			this.courseService.getCourse(params.id, (c) => (this.course = c));

			this.userService.listAssignments(params.id, (res) => {
				this._assignments[res.page] = res.data;
				this.assignments = [].concat.apply([], this._assignments);

				if (res.pagination?.next) res.pagination.next();
			});
		});
	}
}
