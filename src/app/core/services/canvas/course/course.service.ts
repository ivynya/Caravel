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
  Module,
  ModuleItem,
  Page,
  Submission
} from '../../../schemas';

import { RoundDatePipe } from '../../../../core/pipes';

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

  getCourse(courseId: number, callback: (data: Course) => void): void {
    const cached = this.getCached(`${courseId}`);
    if (cached) callback(JSON.parse(cached));
    
    this.fetcher(`${courseId}`, "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<Course>res))
      .catch(ex => console.error(ex));
  }

  getCourseFrontPage(courseId: number, callback: (data: Page) => void): void {
    const cached = this.getCached(`${courseId}/front_page`);
    if (cached) callback(JSON.parse(cached));

    this.fetcher(`${courseId}/front_page`, "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<Page>res))
      .catch(ex => console.error(ex));
  }

  listCourses(callback: (data: Course[]) => void): void {
    const cached = this.getCached("");
    if (cached) callback(JSON.parse(cached));

    this.fetcher("", "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<Course[]>res))
      .catch(ex => console.error(ex));
  }

  listExternalTools(courseId: number, callback: (data: ExternalTool[]) => void): void {
    const cached = this.getCached(`${courseId}/external_tools`);
    if (cached) callback(JSON.parse(cached));

    this.fetcher(`${courseId}/external_tools`, "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<ExternalTool[]>res))
      .catch(ex => console.error(ex));
  }

  listCourseRecentSubmissions(cId: number, callback: (data: Submission[]) => void): void {
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

  listModules(cId: number, callback: (data: Module[]) => void): void {
    const cached = this.getCached(`${cId}/modules`);
    if (cached) callback(JSON.parse(cached));

    this.fetcher(`${cId}/modules`, "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<Module[]>res))
      .catch(ex => console.error(ex));
  }

  getModuleItems(cId: number, mId: number, callback: (data: ModuleItem[]) => void): void {
    const cached = this.getCached(`${cId}/modules/${mId}/items`);
    if (cached) callback(JSON.parse(cached));

    this.fetcher(`${cId}/modules/${mId}/items`, "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<ModuleItem[]>res))
      .catch(ex => console.error(ex));
  }

}
