import { Injectable } from "@angular/core";

import { APIBaseService } from "../base.service";
import {
  CacheService,
  ConfigurationService,
  NotificationService,
  StorageService,
} from "../..";
import { Conversation } from "../../../schemas";

@Injectable({
  providedIn: "root",
})
export class ConversationService extends APIBaseService {
  constructor(
    storage: StorageService,
    notifService: NotificationService,
    cacheService: CacheService,
    configService: ConfigurationService
  ) {
    super("conversations", storage, notifService, cacheService, configService);
  }

  listConversations(
    scope: string,
    callback: (data: Conversation[]) => void
  ): void {
    const qp = { scope };
    this.xfetch<Conversation[]>("", (res) => callback(res.data), {
      params: new URLSearchParams(qp),
    });
  }
}
