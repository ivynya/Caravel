import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../core/services/canvas';
import { Course } from '../core/schemas';

import { ArrowRight16, Checkmark16, Close16, Edit16 } from "@carbon/icons";
import { IconService } from 'carbon-components-angular';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  breadcrumbs: { href?: string, content: string, current?: boolean }[];
  course: Course;

  constructor(private courseService: CourseService,
              private iconService: IconService,
              private location: Location,
              private titleService: Title,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.iconService.registerAll([ArrowRight16, Checkmark16, Close16, Edit16]);

    this.location.onUrlChange(url => {
      this.breadcrumbs = [{ content: this.course.name, href: `/courses/${this.course.id}` }];
      url = url.replace(`/courses/${this.course.id}`, "");
      const fragments = url.split("/").splice(1);
      fragments.pop(); // current page title is already shown
      this.breadcrumbs.push(...fragments.map(fragment => {
        // convert fragment into titlecase
        fragment = fragment.replace(/^./, f => f.toUpperCase());
        return { content: fragment, href: undefined, current: true }
      }));
    });

    this.route.params.subscribe(params => {
      this.courseService.getCourse(params.id, course => {
        this.course = course;
        this.titleService.setTitle(`${course.name} | Caravel`);
        this.breadcrumbs = [{ content: this.course.name, href: `/courses/${this.course.id}` }];
      });
    });
  }
}
