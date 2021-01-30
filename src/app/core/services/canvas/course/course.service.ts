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
              cache: CacheService,
              config: ConfigurationService,
              notif: NotificationService,
              storage: StorageService) {
    super("courses", storage, notif, cache, config);
  }

  getCourse(cId: number, callback: (data: Course) => void): void {
    this.xfetch(`${cId}`, res => {callback(res.data)})
      .catch(ex => console.error(ex));
  }

  getCourseFrontPage(cId: number, callback: (data: Page) => void): void {
    this.xfetch(`${cId}/front_page`, res => {callback(res.data)})
      .catch(ex => console.error(ex));
  }

  listCourses(callback: (data: Course[]) => void): void {
    this.xfetch("", res => {callback(res.data)})
      .catch(ex => console.error(ex));
  }

  listExternalTools(cId: number, callback: (data: ExternalTool[]) => void): void {
    this.xfetch(`${cId}/external_tools`, res => {callback(res.data)})
      .catch(ex => console.error(ex));
  }

  listCourseRecentSubmissions(cId: number, callback: (data: Submission[]) => void): void {
    const loadTo = this.roundDate.transform(new Date(new Date().getTime() - 86400000*31));
    const qp = {
      graded_since: loadTo.toISOString(),
      order_direction: "descending",
      include: "assignment",
    }

    this.xfetch(`${cId}/students/submissions`,
                res => {callback(res.data)},
                { params: new URLSearchParams(qp) })
      .catch(ex => console.error(ex));
  }

  listModules(cId: number, callback: (data: Module[]) => void): void {
    this.xfetch(`${cId}/modules`, res => {callback(res.data)})
      .catch(ex => console.error(ex));
  }

  getModuleItems(cId: number, mId: number, callback: (data: ModuleItem[]) => void): void {
    this.xfetch(`${cId}/modules/${mId}/items`, res => {callback(res.data)})
      .catch(ex => console.error(ex));
  }

}
