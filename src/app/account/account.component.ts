import { Component, OnInit } from '@angular/core';

import { UserService } from '../core/services/canvas';
import { Profile } from '../core/schemas';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  profile: Profile;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void { 
    this.userService.getProfile(data => this.profile = data);
  }

}
