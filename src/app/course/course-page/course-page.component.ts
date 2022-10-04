import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

import { CourseService } from "../../core/services/canvas";
import { Course, Page } from "../../core/schemas";
import { ConfigurationService } from "../../core/services";

@Component({
	selector: "app-course-page",
	templateUrl: "./course-page.component.html",
	styleUrls: ["./course-page.component.scss"],
})
export class CoursePageComponent implements OnInit {
	course: Course;
	page: Page;
	pageBody: SafeHtml;

	constructor(
		private configService: ConfigurationService,
		private courseService: CourseService,
		private sanitizer: DomSanitizer,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		const cId = parseInt(this.route.parent.snapshot.paramMap.get("id"));
		this.courseService.getCourse(cId, (course) => (this.course = course));
		this.route.params.subscribe((p) => {
			this.courseService.getCoursePage(cId, p.pId, (page) => {
				this.page = page;

				const docExtractor = document.createElement("html");
				docExtractor.innerHTML = page.body;
				const frames = docExtractor.getElementsByTagName("iframe");

				for (let i = 0; i < frames.length; i++) {
					const anchorReplacement = document.createElement("a");
					anchorReplacement.href = frames.item(i).src;
					anchorReplacement.target = "_blank;";
					anchorReplacement.innerText = "Open in new tab";
					anchorReplacement.style.borderTopLeftRadius = ".5rem";
					anchorReplacement.style.borderTopRightRadius = ".5rem";
					anchorReplacement.style.display = "block";
					anchorReplacement.style.marginTop = "2rem";
					anchorReplacement.style.padding = "0.5rem 1rem";
					anchorReplacement.style.width = "max-content";
					anchorReplacement.style.backgroundColor = "#f5f5f5";
					frames.item(i).style.backgroundColor = "#f5f5f5";
					frames.item(i).style.borderTopRightRadius = "0.5rem";
					frames
						.item(i)
						.parentNode.insertBefore(anchorReplacement, frames.item(i));
				}

				/*
            const institutionURL = this.configService.get<string>("canvas", "domain").value;
            if (l.href.includes(`https://${institutionURL}`)) {
              l.href = l.href.replace(`https://${institutionURL}`, "");
              l.target = "_self";
            }*/

				this.pageBody = this.sanitizer.bypassSecurityTrustHtml(
					docExtractor.innerHTML
				);
			});
		});
	}
}
