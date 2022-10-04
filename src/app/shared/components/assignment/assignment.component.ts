import { Component, Input, OnInit } from "@angular/core";

import { Assignment, Course } from "../../../core/schemas";
import { AssignmentService } from "../../../core/services/canvas";

@Component({
	selector: "app-assignment",
	templateUrl: "./assignment.component.html",
	styleUrls: ["./assignment.component.scss"],
})
export class AssignmentComponent implements OnInit {
	@Input() course: Course;
	@Input() item: Assignment;

	isLocked = false;

	constructor(private assignmentService: AssignmentService) {}

	ngOnInit(): void {
		this.assignmentService.getAssignment(
			this.item.course_id,
			this.item.id,
			(a) => {
				this.isLocked = a.locked_for_user;
			}
		);
	}
}
