import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { CourseNavComponent } from "./course-nav.component";

describe("CourseNavComponent", () => {
	let component: CourseNavComponent;
	let fixture: ComponentFixture<CourseNavComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [CourseNavComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CourseNavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
