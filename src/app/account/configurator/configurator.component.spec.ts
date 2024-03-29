import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { ConfiguratorComponent } from "./configurator.component";

describe("ConfiguratorComponent", () => {
	let component: ConfiguratorComponent;
	let fixture: ComponentFixture<ConfiguratorComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ConfiguratorComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ConfiguratorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
