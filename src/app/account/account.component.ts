import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../core/services/canvas';
import { Profile } from 'app/core/services/canvas/user/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  profile: Profile;
  
  constructor(private userService: UserService,
              private router: Router) { }

  async ngOnInit(): Promise<void> { 
    this.profile = await this.userService.getProfile();
    console.log(await (await this.userService.getActivityStream()));
  }

}
