import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { CourseDiscussionsComponent } from "./course-discussions.component";

describe("CourseDiscussionsComponent", () => {
	let component: CourseDiscussionsComponent;
	let fixture: ComponentFixture<CourseDiscussionsComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [CourseDiscussionsComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CourseDiscussionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
