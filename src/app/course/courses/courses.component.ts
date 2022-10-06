import { Component, OnInit } from "@angular/core";
import { Course } from "../../_core/schemas";
import { CourseService } from "../../_core/services/canvas";

@Component({
	selector: "app-courses",
	templateUrl: "./courses.component.html",
	styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
	courses: Course[];

	constructor(private courseService: CourseService) {}

	ngOnInit(): void {
		this.courseService.listCourses((courses) => {
			this.courses = courses;
		});
	}
}
