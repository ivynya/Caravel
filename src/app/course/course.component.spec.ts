import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { CourseComponent } from "./course.component";
import { RoundDatePipe } from "../_core/pipes";

describe("CourseComponent", () => {
	let component: CourseComponent;
	let fixture: ComponentFixture<CourseComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [CourseComponent],
			providers: [RoundDatePipe],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CourseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
