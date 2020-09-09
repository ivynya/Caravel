import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../core/services/canvas';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  token: string;
  
  constructor(private userService: UserService,
              private router: Router) { }

  async ngOnInit(): Promise<void> { 
    console.log(await this.userService.getProfile());
  }

}
