import { Injectable } from '@angular/core';

import { APIBaseService } from '../base.service';
import { CacheService } from '../../cache/cache.service';
import { NotificationService } from '../../notification/notification.service';
import { StorageService } from '../../storage/storage.service';

import { Course, ExternalTool, Page } from '../../../schemas';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends APIBaseService {
  
  constructor(storage: StorageService,
              notifService: NotificationService,
              cacheService: CacheService) {
    super("courses", storage, notifService, cacheService);
  }

  async getCourse(courseId: number, callback: (data: Course) => void): Promise<void> {
    const cached = this.getCached(`${courseId}`);
    if (cached) callback(JSON.parse(cached));
    
    this.fetcher(`${courseId}`, "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<Course>res))
      .catch(ex => console.error(ex));
  }

  async getCourseFrontPage(courseId: number,
      callback: (data: Page) => void): Promise<void> {
    const cached = this.getCached(`${courseId}/front_page`);
    if (cached) callback(JSON.parse(cached));

    this.fetcher(`${courseId}/front_page`, "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<Page>res))
      .catch(ex => console.error(ex));
  }

  async listCourses(callback: (data: Course[]) => void): Promise<void> {
    const cached = this.getCached("");
    if (cached) callback(JSON.parse(cached));

    this.fetcher("", "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<Course[]>res))
      .catch(ex => console.error(ex));
  }

  async listExternalTools(courseId: number,
      callback: (data: ExternalTool[]) => void): Promise<void> {
    const cached = this.getCached(`${courseId}/external_tools`);
    if (cached) callback(JSON.parse(cached));

    this.fetcher(`${courseId}/external_tools`, "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<ExternalTool[]>res))
      .catch(ex => console.error(ex));
  }

}
