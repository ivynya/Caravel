import { Injectable } from '@angular/core';

import { APIBaseService } from '../base.service';
import { StorageService } from '../../storage/storage.service';

import { Course, ExternalTool, Page } from '../../../schemas';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends APIBaseService {
  
  constructor(storage: StorageService) {
    super("courses", storage);
  }

  async getCourse(courseId: number): Promise<Course> {
    return new Promise((resolve, reject) => {
      this.fetcher(`${courseId}`, "GET")
        .then(res => JSON.parse(res))
        .then(res => resolve(<Course>res))
        .catch(ex => reject(ex));
    });
  }

  async getCourseFrontPage(courseId: number): Promise<Page> {
    return new Promise((resolve, reject) => {
      this.fetcher(`${courseId}/front_page`, "GET")
        .then(res => JSON.parse(res))
        .then(res => resolve(<Page>res))
        .catch(ex => reject(ex));
    });
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
