import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import {
  ConfigurationService,
  ModalService,
  StorageService
} from '../core/services';
import { UserService } from '../core/services/canvas';
import { AppInfo, Profile } from '../core/schemas';

import { Information24 } from "@carbon/icons";
import { IconService } from 'carbon-components-angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  appInfo: AppInfo;
  profile: Profile;
  mobileAuthUrl?: string;

  storageUsed: number; // in KB

  @ViewChild('mobileAuthorizer') template?: TemplateRef<any>;
  
  constructor(private configService: ConfigurationService,
              private iconService: IconService,
              private modalService: ModalService,
              private storageService: StorageService,
              private userService: UserService) { }

  ngOnInit(): void { 
    this.userService.getProfile(data => this.profile = data);
    this.appInfo = this.configService.getAppInfo();
    this.storageUsed = this.storageService.getSize();
    this.iconService.register(Information24);
  }

  openAuthorizer(): void {
    const token = this.storageService.get("oauth_token");
    this.mobileAuthUrl = `https://caravel.sdbagel.com/auth/${token}`;
    this.modalService.openModal(this.template);
  }

}
