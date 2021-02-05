import { Component, OnInit } from '@angular/core';

import { UserService } from '../core/services/canvas';
import { PlannerItem } from '../core/schemas';

import { RoundDatePipe } from '../core/pipes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Unprocessed stream items for sorting
  private _streamItems: PlannerItem[][] = [];
  // Records what portion of the stream is loaded.
  streamState: { start: Date, end: Date };
  // Holds all stream items (planner) by date.
  stream: {
    id: string
    items: PlannerItem[];
    completed: PlannerItem[];
  }[] = [];

  constructor(private roundDate: RoundDatePipe,
              private userService: UserService) { }

  ngOnInit(): void {
    // Initialize streamstate with date, rounded to 12AM.
    const now = this.roundDate.transform(new Date());
    this.streamState = { start: now, end: now };

    // Load intervals
    this.getItems(0, 1);
  }

  private getItems(at: number, to: number) {
    // Get new interval of items (max 7 days or 10 items)
    const next = new Date(this.streamState.end.getTime() + 86400*1000*7);
    this.userService.getPlanner(this.streamState.end, next, res => {
      const items = res.data;

      if (items.length === 0) {
        // No items, so set end date to load period
        console.warn("[WARN] No items for load period.")
        this.streamState.end = next;
      }
      else {
        // Record what part of the stream is loaded.
        const endDate = new Date(items[items.length-1].plannable_date);
        this.streamState.end = new Date(endDate.getTime() + 1);
      }

      // Add or overwrite added items to memory
      if (this._streamItems.length < at)
        this._streamItems.push([]);
      this._streamItems[at] = items;

      // If target not reached, do a recursion
      if (at < to)
        this.getItems(at + 1, to);
      else if (at === to)
        this.populateStream([].concat.apply([], this._streamItems));
    });
  }

  // Populates stream with events from API
  private populateStream(upcoming: PlannerItem[]): void {
    this.stream = [];
    upcoming.forEach(item => {
      const date = this.formatDate(item.plannable_date);

      let complete = false;
      if (item.submissions.submitted ||
          item.submissions.graded ||
          item.planner_override?.dismissed ||
          item.planner_override?.marked_complete ||
          item.plannable?.workflow_state === "completed")
        complete = true;

      const index = this.stream?.findIndex(i => i.id == date);
      if (index == -1) {
        if (complete)
          this.stream.push({ id: date, items: [], completed: [item] });
        else
          this.stream.push({ id: date, items: [item], completed: [] });
      }
      else {
        if (complete)
          this.stream[index].completed.push(item);
        else
          this.stream[index].items.push(item);
      }
    });
  }

  // Formats a datestring into a human readable date.
  private formatDate(date: string): string {
    const f = new Date(date);
    const today = new Date();
    const tmmrw = new Date(today.getTime() + 86400*1000);
    const ystdy = new Date(today.getTime() - 86400*1000);

    if (f.toDateString() === today.toDateString())
      return "Today";
    else if (f.toDateString() === tmmrw.toDateString())
      return `Tomorrow (${f.toDateString()})`;
    else if (f.toDateString() === ystdy.toDateString())
      return `Yesterday (${f.toDateString()})`;
    else
      return f.toDateString();
  }

}
