import { Injectable } from '@angular/core';

import { APIBaseService } from '../base.service';
import { StorageService } from '../../storage/storage.service';

import { Assignment } from '../../../../core/schemas';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService extends APIBaseService {

  constructor(storage: StorageService) {
    super("courses", storage);
  }

  async getAssignment(courseId: number, assignmentId: number): Promise<Assignment> {
    return new Promise((resolve, reject) => {
      this.fetcher(`${courseId}/assignments/${assignmentId}`, "GET")
        .then(res => JSON.parse(res))
        .then(res => resolve(<Assignment>res))
        .catch(ex => reject(ex));
    });
  }

}
