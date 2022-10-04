import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Shortcut } from "../../schemas";
import { StorageService } from "../storage/storage.service";

@Injectable({
	providedIn: "root",
})
export class ShortcutService {
	shortcuts: Observable<{ [id: string]: Shortcut[] }>;
	private _shortcuts: BehaviorSubject<{ [id: string]: Shortcut[] }>;

	constructor(private storage: StorageService) {
		// Ensure shortcuts exist in localStorage
		if (!this.storage.get("shortcuts")) this.storage.set("shortcuts", "{}");

		// Initialize subject + observable
		const shortcuts = JSON.parse(this.storage.get("shortcuts"));
		this._shortcuts = new BehaviorSubject(shortcuts);
		this.shortcuts = this._shortcuts.asObservable();
	}

	// List all shortcuts for a particular course
	listCourseShortcuts(cId: number): Shortcut[] {
		return this._shortcuts.value[cId];
	}

	// Add a shortcut to a particular course
	addShortcut(cId: number, shortcut: Shortcut): void {
		const shortcuts = this._shortcuts.value;
		if (!shortcuts[cId]) shortcuts[cId] = [];
		shortcuts[cId].push(shortcut);
		this._shortcuts.next(shortcuts);
		this.storage.set("shortcuts", JSON.stringify(shortcuts));
	}
}
