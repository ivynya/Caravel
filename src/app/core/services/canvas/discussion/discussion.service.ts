import { Injectable } from '@angular/core';

import { 
  CacheService,
  ConfigurationService,
  NotificationService,
  StorageService
} from '../..';
import { APIBaseService, ResultHandler } from '../base.service';
import { DiscussionTopic } from '../../../schemas';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService extends APIBaseService {

  constructor(cacheService: CacheService,
              configService: ConfigurationService,
              notifService: NotificationService,
              storage: StorageService) {
    super("courses", storage, notifService, cacheService, configService);
  }

  getTopic(cId: number, tId: number, 
           callback: ResultHandler<DiscussionTopic>): void {
    this.xfetch<DiscussionTopic>(
        `${cId}/discussion_topics/${tId}`, callback)
      .catch(ex => console.error(ex));
  }

  listTopics(cId: number, onlyAnnouncements: boolean,
             callback: ResultHandler<DiscussionTopic[]>): void {
    const qp = onlyAnnouncements ? 'only_announcements': '';

    this.xfetch<DiscussionTopic[]>(
        `${cId}/discussion_topics`, callback,
        { cacheShort: 1000000, params: new URLSearchParams(qp) })
      .catch(ex => console.error(ex));
  }

}
