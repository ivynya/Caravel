import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import {
  ConfigurationService,
  ModalService,
  StorageService
} from '../core/services';
import { UserService } from '../core/services/canvas';
import { AppInfo, Profile } from '../core/schemas';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  appInfo: AppInfo;
  profile: Profile;
  mobileAuthUrl?: string;

  @ViewChild('mobileAuthorizer') template?: TemplateRef<any>;
  
  constructor(private configService: ConfigurationService,
              private modalService: ModalService,
              private storageService: StorageService,
              private userService: UserService) { }

  ngOnInit(): void { 
    this.userService.getProfile(data => this.profile = data);
    this.appInfo = this.configService.getAppInfo();
  }

  openAuthorizer(): void {
    const token = btoa(this.storageService.get("oauth_token"));
    console.log(token);
    this.mobileAuthUrl = `https://caravel.sdbagel.com/auth/${token}`;
    this.modalService.openModal(this.template);
  }

}
