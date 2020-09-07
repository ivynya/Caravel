import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '../core/services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  token: string;
  
  constructor(private storage: StorageService,
              private router: Router) { }

  ngOnInit(): void { }

  tryAuthorize(): void {
    // In a real OAuth context, retrieve the token based
    // off of a server running using the developer key.
    this.storage.set("oauth_token", this.token);
    console.log(this.storage.get("oauth_token"));

    // Redirect back
    this.router.navigateByUrl("/");
  }
}
