import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { ConfigurationService } from '../../core/services';
import { CourseService, UserService } from '../../core/services/canvas';
import { Course, PlannerItem, Submission } from '../../core/schemas';

import { RoundDatePipe } from '../../core/pipes';
@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.scss']
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
  extractedLinks: {title: string, href: string}[];

  // Quick access links and helpers

  constructor(private configService: ConfigurationService,
              private courseService: CourseService,
              private roundDate: RoundDatePipe,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private userService: UserService) {
    this.useRedesign = this.configService.getVal<boolean>("canvas", "use_redesign");
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseService.getCourse(params.id, course => this.course = course);
      this.courseService.listCourseRecentSubmissions(params.id, data => {
        this.recent = data.slice(0, 3);
      });

      // Get course stream (max 10 items or 7 days)
      const now = this.roundDate.transform(new Date());
      const loadTo = new Date(now.getTime() + 86400*1000*7);
      this.userService.getCoursePlanner(now, loadTo, `course_${params.id as string}`, data => {
        this.stream = data;
      });

      // Course front page is used in legacy mode
      this.courseService.getCourseFrontPage(params.id, page => {
        this.frontPage = this.sanitizer.bypassSecurityTrustHtml(page.body);

        // Extracts URLs from home page
        const docExtractor = document.createElement("html");
        docExtractor.innerHTML = page.body;
        this.extractedLinks = Array.from(docExtractor.getElementsByTagName("a"))
          .map(l => {return { title: l.innerText || l.getAttribute("title"), href: l.getAttribute("href") }});
      });
    });
  }

  // Synchronize config with settings here.
  toggleRedesign(): void {
    this.useRedesign = !this.useRedesign;
    this.configService.set("canvas", "use_redesign", this.useRedesign);
  }

  setOpen(): void {
    this.open = true;
  }

}
