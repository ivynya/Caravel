import { Injectable } from '@angular/core';

import { APIBaseService, Result } from '../base.service';
import { 
  CacheService,
  ConfigurationService,
  NotificationService,
  StorageService
} from '../../';
import { PlannerItem, Profile } from '../../../schemas';

@Injectable({
  providedIn: 'root'
})
export class UserService extends APIBaseService {
  
  constructor(storage: StorageService,
              notifService: NotificationService,
              cacheService: CacheService,
              configService: ConfigurationService) {
    super("users", storage, notifService, cacheService, configService);
  }

  // Gets user planner items (assignments, events, etc.)
  getPlanner(start: Date, end: Date, callback:
            (res: {data: PlannerItem[]} & Omit<Result, "data">) => void): void {
    const qp = {
      start_date: start.toISOString(),
      end_date: end.toISOString()
    }
    
    this.xfetch(`self/planner/items`, callback,
                { params: new URLSearchParams(qp) })
      .catch(ex => console.error(ex));
  }

  // Gets user planner items for specified courses/groups
  getCoursePlanner(start: Date, end: Date, codes: string,
                   callback: (data: PlannerItem[]) => void): void {
    const qp = {
      start_date: start.toISOString(),
      end_date: end.toISOString(),
      context_codes: codes
    }
    
    this.xfetch(`self/planner/items`,
                res => {callback(res.data)},
                { params: new URLSearchParams(qp) })
      .catch(ex => console.error(ex));
  }

  // Gets user profile. Used on accounts page.
  getProfile(callback: (data: Profile) => void): void {
    this.xfetch(`self/profile`,
                res => { callback(res.data) },
                { cacheShort: 360000000, cacheLong: 864000000 })
      .catch(ex => console.error(ex));
  }

}
