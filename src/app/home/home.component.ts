import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'app/core/services/canvas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private courseService: CourseService) { }

  async ngOnInit(): Promise<void> { 
    console.log(await this.courseService.listCourses());
  }

}
