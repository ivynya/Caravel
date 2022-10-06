import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "mapSubmitType",
})
export class MapSubmitTypePipe implements PipeTransform {
	transform(type: string): string {
		switch (type) {
			case "online_text_entry":
				return "Online Text Upload";
			case "online_url":
				return "Web URL";
			case "online_upload":
				return "File Upload";
			case "media_recording":
				return "Media Recording";
			case "external_tool":
				return "External Tool";
			default:
				return "Unknown";
		}
	}
}
