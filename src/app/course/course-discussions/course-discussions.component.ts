import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CourseService, DiscussionService } from "../../_core/services/canvas";
import { Course, DiscussionTopic } from "../../_core/schemas";

@Component({
	selector: "app-course-discussions",
	templateUrl: "./course-discussions.component.html",
	styleUrls: ["./course-discussions.component.scss"],
})
export class CourseDiscussionsComponent implements OnInit {
	course: Course;
	discussions: DiscussionTopic[];
	private _discussions: DiscussionTopic[][] = [];

	constructor(
		private courseService: CourseService,
		private discussionService: DiscussionService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.parent.params.subscribe((params) => {
			this.courseService.getCourse(params.id, (c) => (this.course = c));

			this.discussionService.listTopics(params.id, false, (res) => {
				this._discussions[res.page] = res.data;
				this.discussions = [].concat.apply([], this._discussions);

				if (res.pagination?.next) res.pagination.next();
			});
		});
	}
}
