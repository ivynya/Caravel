import { Injectable } from '@angular/core';

import { APIBaseService } from '../base.service';
import { StorageService } from '../../storage/storage.service';

import {
  ActivityStreamGeneric,
  Profile 
} from './user.d';

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

  async getProfile(): Promise<Profile> {
    return new Promise((resolve, reject) => {
      this.fetcher("self/profile", "GET")
        .then(res => JSON.parse(res))
        .then(res => resolve(<Profile>res))
        .catch(ex => reject(ex));
    });
  }

}
