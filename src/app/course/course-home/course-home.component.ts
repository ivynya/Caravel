import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

import { CacheService, ConfigurationService } from "../../core/services";
import { CourseService, UserService } from "../../core/services/canvas";
import { Course, PlannerItem, Submission } from "../../core/schemas";

import { ConvertUrlPipe, RoundDatePipe } from "../../core/pipes";
@Component({
	selector: "app-course-home",
	templateUrl: "./course-home.component.html",
	styleUrls: ["./course-home.component.scss"],
})
export class CourseHomeComponent implements OnInit {
	// Determines if redesigned course home is used
	useRedesign = true;
	course: Course;
	recent: Submission[];
	stream: PlannerItem[];

	open = false;

	// Front page if using legacy home page
	frontPage: SafeHtml;
	extractedLinks: { target: string; title: string; href: string }[];

	// Quick access links and helpers

	constructor(
		private cacheService: CacheService,
		private configService: ConfigurationService,
		private courseService: CourseService,
		private convertUrl: ConvertUrlPipe,
		private roundDate: RoundDatePipe,
		private route: ActivatedRoute,
		private sanitizer: DomSanitizer,
		private userService: UserService
	) {
		this.useRedesign = this.configService.getVal<boolean>(
			"course",
			"use_redesign"
		);
	}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.courseService.getCourse(params.id, (course) => {
				this.course = course;
				this.nickname = course.name;
			});
			this.courseService.listCourseRecentSubmissions(params.id, (data) => {
				data = data.slice(0, 3).map((s) => {
					if (s.graded_at) s.score = Math.round(s.score * 100) / 100;
					return { ...s };
				});
				this.recent = data;
			});

			// Get course stream (max 10 items or 7 days)
			const now = this.roundDate.transform(new Date());
			const loadTo = new Date(now.getTime() + 86400 * 1000 * 7);
			this.userService.getCoursePlanner(
				now,
				loadTo,
				`course_${params.id as string}`,
				(data) => {
					this.stream = data;
				}
			);

			// Course front page is used in legacy mode
			this.courseService.getCourseFrontPage(params.id, (page) => {
				this.frontPage = this.sanitizer.bypassSecurityTrustHtml(page.body);

				// Extracts URLs from home page
				const docExtractor = document.createElement("html");
				docExtractor.innerHTML = page.body;
				this.extractedLinks = Array.from(docExtractor.getElementsByTagName("a"))
					.map((l) => {
						return {
							target: "_blank",
							title: l.innerText || l.getAttribute("title"),
							href: l.getAttribute("href"),
						};
					})
					.map((l) => {
						const transform = this.convertUrl.transform(l.href);
						if (transform !== l.href) l.target = "_self";
						l.href = transform;
						return l;
					});
			});
		});
	}

	// Updates course nickname and updates UI
	nickname: string;
	setNickname(): void {
		this.userService.setCourseNickname(
			this.course.id,
			this.nickname || this.course.name,
			() => {
				this.cacheService.clear("courses", `${this.course.id}`); // clear this page cache
				this.cacheService.clear("courses", `enrollment.state.active`); // clear navbar cache
				this.courseService.getCourse(
					this.course.id,
					(course) => (this.course = course)
				);
			}
		);
	}

	deleteNickname(): void {
		this.userService.deleteCourseNickname(this.course.id, () => {
			this.cacheService.clear("courses", `${this.course.id}`); // clear this page cache
			this.cacheService.clear("courses", `enrollment.state.active`); // clear navbar cache
			this.courseService.getCourse(
				this.course.id,
				(course) => (this.course = course)
			);
		});
	}

	// Synchronize config with settings here.
	toggleRedesign(): void {
		this.useRedesign = !this.useRedesign;
		this.configService.set("course", "use_redesign", this.useRedesign);
	}

	setOpen(): void {
		this.open = true;
	}
}
