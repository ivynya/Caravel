import { Injectable } from '@angular/core';

import { APIBaseService } from '../base.service';
import {
  CacheService,
  ConfigurationService,
  NotificationService,
  StorageService
} from '../../';

import { Assignment, Submission } from '../../../../core/schemas';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService extends APIBaseService {

  constructor(storage: StorageService,
              notifService: NotificationService,
              cacheService: CacheService,
              configService: ConfigurationService) {
    super("courses", storage, notifService, cacheService, configService);
  }

  getAssignment(cId: number, aId: number,
                callback: (data: Assignment) => void): void {
    const cached = this.getCached(`${cId}/assignments/${aId}`);
    if (cached) callback(JSON.parse(cached));

    this.fetcher(`${cId}/assignments/${aId}`, "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<Assignment>res))
      .catch(ex => console.error(ex));
  }

  // Given course, assignment, and user ID, get latest submission
  getLatestSubmission(cId: number, aId: number,
                      callback: (data: Submission) => void): void {
    const cached = this.getCached(`${cId}/assignments/${aId}/submissions/self`);
    if (cached) callback(JSON.parse(cached));
    
    this.fetcher(`${cId}/assignments/${aId}/submissions/self`, "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<Submission>res))
      .catch(ex => console.error(ex));
  }

}
