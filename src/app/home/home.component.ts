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
  // Enables "selection mode" for items on mobile
  // SM only affects the component at < 512px.
  selectionMode = false;

  constructor(private roundDate: RoundDatePipe,
              private userService: UserService) { }

  ngOnInit(): void {
    this.loadFromToday();
  }
  
  // Toggles selection mode on todo components
  toggleSelectionMode(): void {
    this.selectionMode = !this.selectionMode;
  }

  loadFromToday(): void {
    // Reset and rebuild stream
    this._streamItems = [];
    this.stream = [];

    // Initialize streamstate with date, rounded to 12AM.
    const now = this.roundDate.transform(new Date());
    this.streamState = { start: now, end: now };

    // Load intervals
    this.getItems(1);
  }

  loadFromPreviousDay(): void {
    // Reset and rebuild stream
    this._streamItems = [];
    this.stream = [];

    // Reset stream period to previous date
    const prev = new Date(this.streamState.start.getTime() - 86400000);
    this.streamState = { start: prev, end: prev };

    this.getItems(1);
  }

  private getItems(to: number) {
    const next = new Date(this.streamState.start.getTime() + 86400*1000*31);
    this.userService.getPlanner(this.streamState.start, next, res => {
      const items = res.data;

      // Add or overwrite added items to memory
      this._streamItems[res.page] = items;
      const concat = [].concat.apply([], this._streamItems);
      this.streamState.end = new Date(concat[concat.length-1].plannable_date);
      this.populateStream(concat);

      // If target not reached, do a recursion
      if (to > 0 && res.pagination?.next)
        { to--; res.pagination.next(); }
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
