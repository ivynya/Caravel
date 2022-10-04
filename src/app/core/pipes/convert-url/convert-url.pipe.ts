import { Pipe, PipeTransform } from "@angular/core";
import { ConfigurationService } from "../../services";

@Pipe({
	name: "convertUrl",
})
export class ConvertUrlPipe implements PipeTransform {
	constructor(private config: ConfigurationService) {}

	transform(url: string): string {
		const domain = this.config.getVal<string>("canvas", "domain");

		if (url.includes(`https://${domain}`))
			url = url.replace(`https://${domain}`, "");

		return url;
	}
}
