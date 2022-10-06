import { Component, Input, OnChanges } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

import { Submission } from "../../../_core/schemas";

@Component({
	selector: "assignment-submission",
	templateUrl: "./submission.component.html",
	styleUrls: ["./submission.component.scss"],
})
export class SubmissionComponent implements OnChanges {
	@Input() submission: Submission;
	previewUrl: SafeResourceUrl;

	constructor(private sanitizer: DomSanitizer) {}

	ngOnChanges(): void {
		this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
			this.submission?.preview_url
		);
	}
}
