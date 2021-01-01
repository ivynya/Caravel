import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigurationService } from '../core/services';
import { UserService } from '../core/services/canvas';
import { Profile } from '../core/schemas';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  profile: Profile;
  
  constructor(private config: ConfigurationService,
              private userService: UserService,
              private router: Router) { }

  async ngOnInit(): Promise<void> { 
    this.userService.getProfile(data => {
      this.profile = data;
    });
    this.config.resetToDefault();
    console.log(this.config.getAll());
  }

}
