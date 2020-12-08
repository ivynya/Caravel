import { Injectable } from '@angular/core';

import { APIBaseService } from '../base.service';
import { StorageService } from '../../storage/storage.service';

import {
  ActivityStreamGeneric,
  Profile,
  TodoAssignment,
  TodoEvent
} from '../../../schemas';

@Injectable({
  providedIn: 'root'
})
export class UserService extends APIBaseService {
  
  constructor(storage: StorageService) {
    super("users", storage);
  }
  
  async getActivityStream(): Promise<ActivityStreamGeneric[]> {
    return new Promise((resolve, reject) => {
      this.fetcher("self/activity_stream", "GET")
        .then(res => JSON.parse(res))
        .then(res => resolve(<ActivityStreamGeneric[]>res))
        .catch(ex => reject(ex));
    });
  }

  async getTodo(): Promise<TodoAssignment[]> {
    return new Promise((resolve, reject) => {
      this.fetcher("self/todo", "GET")
        .then(res => JSON.parse(res))
        .then(res => resolve(<TodoAssignment[]>res))
        .catch(ex => reject(ex));
    });
  }

  async getUpcoming(): Promise<Array<TodoAssignment|TodoEvent>> {
    return new Promise((resolve, reject) => {
      this.fetcher("self/upcoming_events", "GET")
        .then(res => JSON.parse(res))
        .then(res => resolve(<Array<TodoAssignment|TodoEvent>>res))
        .catch(ex => reject(ex));
    });
  }

  async getProfile(): Promise<Profile> {
    return new Promise((resolve, reject) => {
      this.fetcher("self/profile", "GET")
        .then(res => JSON.parse(res))
        .then(res => resolve(<Profile>res))
        .catch(ex => reject(ex));
    });
  }

}
