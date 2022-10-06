import { Component, OnInit } from "@angular/core";
import { Conversation } from "../core/schemas";
import { ConversationService } from "../core/services/canvas/";

@Component({
	selector: "app-inbox",
	templateUrl: "./inbox.component.html",
	styleUrls: ["./inbox.component.scss"],
})
export class InboxComponent implements OnInit {
	conversations: Conversation[];

	constructor(private conversation: ConversationService) {}

	ngOnInit(): void {
		this.conversation.listConversations("sent", c => this.conversations = c);
	}
}
