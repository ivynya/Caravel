import { Component, OnInit } from '@angular/core';

import { UserService } from '../core/services/canvas';
import { Course, PlannerItem } from '../core/schemas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Holds all stream items (planner) by date.
  stream: {
    id: string
    items: PlannerItem[];
    completed: PlannerItem[];
  }[] = [];
  // Records what portion of the stream is loaded.
  streamState: { start: Date, end: Date };

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    // Get current date and end date, rounded to 12AM.
    // Large date range to get as much data as possible from Canvas.
    // Use last returned assignment to determine loaded range.
    let now = new Date();
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let end = new Date(now.getTime() + 86400*1000*31);

    // Get planner items in this interval.
    this.userService.getPlanner(now, end, items => {
      this.populateStream(items);

      // Record what part of the stream is loaded.
      const endDate = new Date(items[items.length-1].plannable_date);
      this.streamState = { start: now, end: endDate };
    });
  }

  // Populates stream with events from API
  private populateStream(upcoming: PlannerItem[]): void {
    this.stream = [];
    upcoming.forEach(item => {
      let date = this.formatDate(item.plannable_date);

      const index = this.stream?.findIndex(i => i.id == date);
      if (index == -1)
        this.stream.push({ id: date, items: [item], completed: [] });
      else
        this.stream[index].items.push(item);
    });
  }

  // Formats a datestring into a human readable date.
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
