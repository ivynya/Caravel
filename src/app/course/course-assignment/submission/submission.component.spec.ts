import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { SubmissionComponent } from "./submission.component";

describe("SubmissionComponent", () => {
	let component: SubmissionComponent;
	let fixture: ComponentFixture<SubmissionComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [SubmissionComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SubmissionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
