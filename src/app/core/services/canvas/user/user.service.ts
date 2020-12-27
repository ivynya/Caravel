import { Injectable } from '@angular/core';

import { APIBaseService } from '../base.service';
import { StorageService } from '../../storage/storage.service';

import {
  ActivityStreamGeneric,
  Profile,
  TodoAssignment,
  TodoEvent
} from '../../../schemas';
import { BehaviorSubject, Observable } from 'rxjs';

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

  async getUpcoming(callback: (data: Array<TodoAssignment|TodoEvent>) => void): Promise<void> {
    const cached = this.getCached("self/upcoming_events");
    if (cached) callback(JSON.parse(cached));
    
    this.fetcher("self/upcoming_events", "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<Array<TodoAssignment|TodoEvent>>res))
      .catch(ex => console.error(ex));
  }

  // Gets user profile. Used on accounts page.
  async getProfile(callback: (data: Profile) => void): Promise<void> {
    const cached = this.getCached("self/profile");
    if (cached) callback(JSON.parse(cached));
    
    this.fetcher("self/profile", "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<Profile>res))
      .catch(ex => console.error(ex));
  }

}
