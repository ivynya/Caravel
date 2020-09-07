import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '../../../core/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  showSettings = false;
  showHelp = false;
  
  constructor(private storage: StorageService,
              private router: Router) { }

  ngOnInit(): void { }

  toggleSettings(): void {
    this.showSettings = !this.showSettings;
    this.showHelp = false;
  }

  toggleHelp(): void {
    this.showHelp = !this.showHelp;
    this.showSettings = false;
  }
}
