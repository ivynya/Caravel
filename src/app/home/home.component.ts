import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseService, UserService } from '../core/services/canvas';
import { Course, TodoGeneric } from '../core/schemas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  courses: Course[];
  todo: TodoGeneric[];
  stream: Array<{
    id: string
    items: TodoGeneric[];
  }> = [];

  constructor(private router: Router, 
              private courseService: CourseService,
              private userService: UserService) { }

  async ngOnInit(): Promise<void> { 
    //this.courses = await this.courseService.listCourses();
    this.todo = (await this.userService.getTodo()).sort((a, b) => {
      return (new Date(a.assignment.due_at).getTime()) - (new Date(b.assignment.due_at).getTime())
    });

    this.todo.forEach(t => {
      let date = new Date(t.assignment?.due_at).toDateString();
      if (date === new Date().toDateString()) date = "Today";
      const index = this.stream?.findIndex(i => i.id == date);
      if (index == -1 || !index)
        this.stream.push({ id: date, items: [t] });
      else
        this.stream[index].items.push(t);
    });
  }

}
