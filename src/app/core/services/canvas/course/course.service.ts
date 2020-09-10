import { Injectable } from '@angular/core';

import { APIBaseService } from '../base.service';
import { StorageService } from '../../storage/storage.service';

import { Course, ExternalTool } from './course.d';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends APIBaseService {
  
  constructor(storage: StorageService) {
    super("courses", storage);
  }

  async listCourses(): Promise<Course[]> {
    return new Promise((resolve, reject) => {
      this.fetcher("", "GET")
        .then(res => JSON.parse(res))
        .then(res => resolve(<Course[]>res))
        .catch(ex => reject(ex));
    });
  }

  async listExternalTools(courseId: number): Promise<ExternalTool[]> {
    return new Promise((resolve, reject) => {
      this.fetcher(`${courseId}/external_tools`, "GET")
        .then(res => JSON.parse(res))
        .then(res => resolve(<ExternalTool[]>res))
        .catch(ex => reject(ex));
    });
  }

}
