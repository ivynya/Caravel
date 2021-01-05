import { Component, OnInit } from '@angular/core';

import { UserService } from '../core/services/canvas';
import { Course, PlannerItem } from '../core/schemas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  courses: Course[];
  stream: Array<{
    id: string
    items: PlannerItem[];
  }> = [];

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> { 
    let now = new Date();
    let end = new Date(now.getTime() + 86400*1000*31);

    this.userService.getPlanner(now, end, items => {
      this.populateStream(items);
    });
  }

  // Populates stream with events from API
  private populateStream(upcoming: PlannerItem[]): void {
    upcoming.forEach(item => {
      let date = this.formatDate(item.plannable_date);

      const index = this.stream?.findIndex(i => i.id == date);
      if (index == -1)
        this.stream.push({ id: date, items: [item] });
      else
        this.stream[index].items.push(item);
    });
  }

  private formatDate(date: string): string {
    let f = new Date(date);
    let today = new Date();
    let tmmrw = new Date(today.getTime() + 86400*1000);

    if (f.toDateString() === today.toDateString())
      return "Today";
    else if (f.toDateString() === tmmrw.toDateString())
      return `Tomorrow (${f.toDateString()})`;
    else
      return f.toDateString();
  }

}
