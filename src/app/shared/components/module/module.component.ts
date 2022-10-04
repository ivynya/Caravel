import { Component, Input, OnInit } from "@angular/core";
import { Course, ModuleItem } from "../../../core/schemas";

@Component({
	selector: "app-module",
	templateUrl: "./module.component.html",
	styleUrls: ["./module.component.scss"],
})
export class ModuleComponent implements OnInit {
	@Input() course: Course;
	@Input() item: ModuleItem;

	constructor() {}

	ngOnInit(): void {}
}
