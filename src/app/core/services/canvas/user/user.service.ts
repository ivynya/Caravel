import { Injectable } from '@angular/core';

import { APIBaseService } from '../base.service';
import { StorageService } from '../../storage/storage.service';

import {
  ActivityStreamGeneric,
  Profile,
  TodoAssignment,
  TodoEvent
} from '../../../schemas';
import { NotificationService } from '../../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends APIBaseService {
  
  constructor(storage: StorageService,
              notifService: NotificationService) {
    super("users", storage, notifService);
  }
  
  // Get activity stream for user. Ex: "Assignment created", etc.
  async getActivityStream(): Promise<ActivityStreamGeneric[]> {
    return new Promise((resolve, reject) => {
      this.fetcher("self/activity_stream", "GET")
        .then(res => JSON.parse(res))
        .then(res => resolve(<ActivityStreamGeneric[]>res))
        .catch(ex => reject(ex));
    });
  }

  // Gets users remaining todo items. Does not include events.
  async getTodo(): Promise<TodoAssignment[]> {
    return new Promise((resolve, reject) => {
      this.fetcher("self/todo", "GET")
        .then(res => JSON.parse(res))
        .then(res => resolve(<TodoAssignment[]>res))
        .catch(ex => reject(ex));
    });
  }

  // Get global "stream" of future items/events, to do
  async getUpcoming(callback: (data: Array<TodoAssignment|TodoEvent>) => void): Promise<void> {
    const cached = this.getCached("self/upcoming_events");
    if (cached) callback(JSON.parse(cached));
    
    this.fetcher("self/upcoming_events", "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<Array<TodoAssignment|TodoEvent>>res))
      .catch(ex => console.error(ex));
  }

  // Gets user planner items (assignments, events, etc.)
  async getPlanner(start: Date, end: Date,
      callback: (data: any) => void): Promise<void> {
    const qp = {
      start_date: start.toISOString(),
      end_date: end.toISOString()
    }
    const query = new URLSearchParams(qp).toString();
    const cached = this.getCached(`self/planner/items?${query}`);
    if (cached) callback(JSON.parse(cached));
    
    this.fetcher(`self/planner/items?${query}`, "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<any>res))
      .catch(ex => console.error(ex));
  }

  // Gets user planner items for specified courses/groups
  async getCoursePlanner(start: Date, end: Date, codes: string,
      callback: (data: any) => void): Promise<void> {
    const qp = {
      start_date: start.toISOString(),
      end_date: end.toISOString(),
      context_codes: codes
    }
    const query = new URLSearchParams(qp).toString();
    const cached = this.getCached(`self/planner/items?${query}`);
    if (cached) callback(JSON.parse(cached));
    
    this.fetcher(`self/planner/items?${query}`, "GET")
      .then(res => JSON.parse(res))
      .then(res => callback(<any>res))
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
