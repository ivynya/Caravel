import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { TodoComponent } from "./todo.component";
import { TranslateModule } from "@ngx-translate/core";
import { RouterTestingModule } from "@angular/router/testing";

describe("TodoComponent", () => {
	let component: TodoComponent;
	let fixture: ComponentFixture<TodoComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [TodoComponent],
			imports: [TranslateModule.forRoot(), RouterTestingModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		window.localStorage.setItem("oauth_token", "test");

		fixture = TestBed.createComponent(TodoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
