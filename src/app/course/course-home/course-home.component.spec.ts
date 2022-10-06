import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { CourseHomeComponent } from "./course-home.component";
import { RoundDatePipe } from "../../_core/pipes";

describe("CourseHomeComponent", () => {
	let component: CourseHomeComponent;
	let fixture: ComponentFixture<CourseHomeComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [CourseHomeComponent],
			providers: [RoundDatePipe],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CourseHomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
