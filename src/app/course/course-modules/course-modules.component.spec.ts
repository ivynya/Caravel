import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { CourseModulesComponent } from "./course-modules.component";
import { RoundDatePipe } from "../../_core/pipes";

describe("CourseModulesComponent", () => {
	let component: CourseModulesComponent;
	let fixture: ComponentFixture<CourseModulesComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [CourseModulesComponent],
			providers: [RoundDatePipe],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CourseModulesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
