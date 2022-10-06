import { Component, Input } from "@angular/core";

import { Assignment } from "../../../_core/schemas";

@Component({
	selector: "assignment-submitter",
	templateUrl: "./submitter.component.html",
	styleUrls: ["./submitter.component.scss"],
})
export class SubmitterComponent {
	@Input() assignment: Assignment;

	constructor() {}
}
