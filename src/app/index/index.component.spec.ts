import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { IndexComponent } from "./index.component";
import { TranslateModule } from "@ngx-translate/core";
import { RouterTestingModule } from "@angular/router/testing";

describe("IndexComponent", () => {
	let component: IndexComponent;
	let fixture: ComponentFixture<IndexComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [IndexComponent],
			imports: [TranslateModule.forRoot(), RouterTestingModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		window.localStorage.setItem("oauth_token", "test");

		fixture = TestBed.createComponent(IndexComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
