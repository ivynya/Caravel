import { Injectable } from '@angular/core';

import { APIBaseService, ResultHandler } from '../base.service';
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
  SessionlessLaunch,
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
    this.xfetch<Course>(
        `${cId}`, res => {callback(res.data)},
        { cacheShort: 360000000, cacheLong: 864000000 })
      .catch(ex => console.error(ex));
  }

  getCoursePage(cId: number, pId: string, callback: (data: Page) => void): void {
    this.xfetch<Page>(
        `${cId}/pages/${pId}`,
        res => {callback(res.data)},
        { cacheShort: 120000 })
      .catch(ex => console.error(ex));
  }

  getCourseFrontPage(cId: number, callback: (data: Page) => void): void {
    this.xfetch<Page>(
        `${cId}/front_page`, res => {callback(res.data)},
        { cacheShort: 360000000, cacheLong: 864000000 })
      .catch(ex => console.error(ex));
  }

  listCourses(callback: (data: Course[]) => void): void {
    this.xfetch<Course[]>(
        '', res => {callback(res.data)},
        { cacheShort: 360000000, cacheLong: 864000000,
					params: new URLSearchParams('enrollment_state=active') })
      .catch(ex => console.error(ex));
  }

  listExternalTools(cId: number, callback: (data: ExternalTool[]) => void): void {
    this.xfetch<ExternalTool[]>(
        `${cId}/external_tools`, res => {callback(res.data)},
        { cacheShort: 360000000, cacheLong: 864000000 })
      .catch(ex => console.error(ex));
  }

  getExternalSessionlessLaunch(cId: number, aId: number, type: string, callback: (data: SessionlessLaunch) => void): void {
    const qp = {
      assignment_id: aId.toString(),
      launch_type: type
    }
    this.xfetch<SessionlessLaunch>(
        `${cId}/external_tools/sessionless_launch`, res => {callback(res.data)},
        { cacheShort: 0, cacheLong: 0,
          params: new URLSearchParams(qp) })
      .catch(ex => console.error(ex));
  }

  listCourseRecentSubmissions(cId: number, callback: (data: Submission[]) => void): void {
    const loadTo = this.roundDate.transform(new Date(new Date().getTime() - 86400000*31));
    const qp = {
      graded_since: loadTo.toISOString(),
      order_direction: "descending",
      include: "assignment",
    }

    this.xfetch<Submission[]>(
        `${cId}/students/submissions`,
        res => {callback(res.data)},
        { cacheShort: 120000, params: new URLSearchParams(qp) })
      .catch(ex => console.error(ex));
  }

  listModules(cId: number, callback: ResultHandler<Module[]>): void {
    this.xfetch<Module[]>(`${cId}/modules`, callback)
      .catch(ex => console.error(ex));
  }

  getModuleItems(cId: number, mId: number, callback: ResultHandler<ModuleItem[]>): void {
    this.xfetch<ModuleItem[]>(
        `${cId}/modules/${mId}/items`, callback)
      .catch(ex => console.error(ex));
  }

}
