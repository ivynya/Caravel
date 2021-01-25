import { Injectable } from '@angular/core';

import { APIBaseService } from '../base.service';
import { 
  CacheService,
  ConfigurationService,
  NotificationService,
  StorageService
} from '../../';
import {
  Course,
  ExternalTool,
  Page,
  Submission
} from '../../../schemas';

import { RoundDatePipe } from 'app/core/pipes/round-date/round-date.pipe';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends APIBaseService {
  
  constructor(private roundDate: RoundDatePipe,
              storageService: StorageService,
              notifService: NotificationService,
              cacheService: CacheService,
              configService: ConfigurationService) {
    super("courses", storageService, notifService, cacheService, configService);
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

  async listCourseRecentSubmissions(cId: number,
      callback: (data: Submission[]) => void): Promise<void> {
    const loadTo = this.roundDate.transform(new Date(new Date().getTime() - 86400000*31));
    const qp = {
      graded_since: loadTo.toISOString(),
      order_direction: "descending",
      include: "assignment",
    }
    const query = new URLSearchParams(qp).toString();
    const cached = this.getCached(`${cId}/students/submissions?${query}`);
    if (cached) callback(JSON.parse(cached));

    this.fetchp(`${cId}/students/submissions`, query, "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<Submission[]>res))
      .catch(ex => console.error(ex));
  }

}
