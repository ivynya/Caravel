import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { AccountComponent } from "./account.component";
import { TranslateModule } from "@ngx-translate/core";
import { RouterTestingModule } from "@angular/router/testing";

describe("AccountComponent", () => {
	let component: AccountComponent;
	let fixture: ComponentFixture<AccountComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [AccountComponent],
			imports: [TranslateModule.forRoot(), RouterTestingModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		window.localStorage.setItem("oauth_token", "test");

		fixture = TestBed.createComponent(AccountComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
