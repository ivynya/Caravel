import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

import { ConfigurationService } from "../_core/services";
import { CourseService } from "../_core/services/canvas";
import { Course } from "../_core/schemas";

@Component({
	selector: "app-course",
	templateUrl: "./course.component.html",
	styleUrls: ["./course.component.scss"],
})
export class CourseComponent implements OnInit {
	breadcrumbs: { href?: string; content: string; current?: boolean }[];
	showBreadcrumbs = true;
	course: Course;

	constructor(
		private config: ConfigurationService,
		private courseService: CourseService,
		private location: Location,
		private title: Title,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.showBreadcrumbs = this.config.getVal(
			"course",
			"show_breadcrumbs"
		);

		this.location.onUrlChange((url) => {
			this.breadcrumbs = [
				{ content: this.course.name, href: `/courses/${this.course.id}` },
			];
			url = url.replace(`/courses/${this.course.id}`, "");
			const fragments = url.split("/").splice(1);
			fragments.pop(); // current page title is already shown
			this.breadcrumbs.push(
				...fragments.map((fragment) => {
					// convert fragment into titlecase
					fragment = fragment.replace(/^./, (f) => f.toUpperCase());
					return { content: fragment, href: undefined, current: true };
				})
			);
		});

		this.route.params.subscribe((params) => {
			this.courseService.getCourse(params.id, (course) => {
				this.course = course;
				this.title.setTitle(`${course.name} | Caravel`);
				this.breadcrumbs = [
					{ content: this.course.name, href: `/courses/${this.course.id}` },
				];
			});
		});
	}
}
