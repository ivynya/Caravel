import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseService, UserService } from '../core/services/canvas';
import { Course, TodoAssignment, TodoEvent } from '../core/schemas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  courses: Course[];
  stream: Array<{
    id: string
    items: Array<TodoAssignment|TodoEvent>;
  }> = [];

  constructor(private router: Router, 
              private courseService: CourseService,
              private userService: UserService) { }

  async ngOnInit(): Promise<void> { 
    //this.courses = await this.courseService.listCourses();
    const upcoming = await this.userService.getUpcoming();
    console.log(upcoming);

    upcoming.forEach(item => {
      let date: string;
      if ((item as TodoAssignment).assignment)
        date = new Date((<TodoAssignment>item).assignment?.due_at).toDateString();
      else if ((item as TodoEvent).start_at)
        date = new Date((<TodoEvent>item).start_at).toDateString();
        
      if (date === new Date().toDateString()) date = "Today";
      const index = this.stream?.findIndex(i => i.id == date);
      if (index == -1 || !index)
        this.stream.push({ id: date, items: [item] });
      else
        this.stream[index].items.push(item);
    });
  }

}
