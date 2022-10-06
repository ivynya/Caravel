import { Component } from "@angular/core";

import { UserService } from "../_core/services/canvas";
import { PlannerItem } from "../_core/schemas";

import { RoundDatePipe } from "../_core/pipes";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
	// Records the start date of the stream
	streamStart: Date;
	_streamStart: [Date];
	// Unprocessed stream items for sorting
	private _streamItems: PlannerItem[][] = [];
	// Holds all stream items (planner) by date.
	stream: {
		id: string;
		items: PlannerItem[];
		completed: PlannerItem[];
	}[] = [];
	// Enables "selection mode" for items @ < 512px width
	selectionMode = false;

	constructor(private roundDate: RoundDatePipe, private user: UserService) {
		this.loadFromToday();
	}

	// Toggles selection mode on todo components
	toggleSelectionMode(): void {
		this.selectionMode = !this.selectionMode;
	}

	// Adapts the ibm-datepicker model to a single Date
	ibmDateAdapter(): void {
		this.streamStart = this._streamStart[0];
	}

	// Reset and rebuild stream from streamStart
	load(): void {
		this._streamStart = [this.streamStart];
		this._streamItems = [];
		this.stream = [];
		this.getItems(1);
	}

	// Reset stream to start from today at 12AM
	loadFromToday(): void {
		this.streamStart = this.roundDate.transform(new Date());
		this.load();
	}

	// Rebuild stream from one day before currently loaded
	loadFromPreviousDay(): void {
		this.streamStart = new Date(this.streamStart.getTime() - 86400000);
		this.load();
	}

	// Recursively gets items up to 1 month in advance
	private getItems(to: number): void {
		const next = new Date(this.streamStart.getTime() + 86400 * 1000 * 31);
		this.user.getPlanner(this.streamStart, next, (res) => {
			// Add or overwrite added items to memory
			this._streamItems[res.page] = res.data;
			this.populateStream([].concat(...this._streamItems));

			// Indicates if items were successfully loaded
			let populated = this.stream.map(d => d.items.length > 0).includes(true);

			// If more segments to load, or no items in period, continue
			if ((!populated || to > 0) && res.pagination?.next) {
				to--;
				res.pagination.next();
			}
		});
	}

	// Populates stream with events from API
	private populateStream(upcoming: PlannerItem[]): void {
		this.stream = [];
		upcoming.forEach((item) => {
			const date = this.formatDate(item.plannable_date);

			let complete =
				item.submissions.submitted ||
				item.submissions.graded ||
				item.planner_override?.dismissed ||
				item.planner_override?.marked_complete ||
				item.plannable?.workflow_state === "completed";

			if (this.stream?.findIndex((i) => i.id == date) == -1)
				this.stream.push({ id: date, items: [], completed: [] });

			const index = this.stream?.findIndex((i) => i.id == date);
			if (complete) this.stream[index].completed.push(item);
			else this.stream[index].items.push(item);
		});
	}

	// Formats a datestring into a human readable date.
	private formatDate(date: string): string {
		const f = new Date(date);
		const today = new Date();
		const tmmrw = new Date(today.getTime() + 86400 * 1000);
		const ystdy = new Date(today.getTime() - 86400 * 1000);

		switch (f.toDateString()) {
			case today.toDateString():
				return "Today";
			case tmmrw.toDateString():
				return `Tomorrow (${f.toDateString()})`;
			case ystdy.toDateString():
				return `Yesterday (${f.toDateString()})`;
			default:
				return f.toDateString();
		}
	}
}
