import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { CoursePageComponent } from "./course-page.component";

describe("CoursePageComponent", () => {
	let component: CoursePageComponent;
	let fixture: ComponentFixture<CoursePageComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [CoursePageComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CoursePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
