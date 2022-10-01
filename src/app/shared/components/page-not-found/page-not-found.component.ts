import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../../core/services';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  canvasURL: string;

  constructor(config: ConfigurationService) {
    const institutionURL = config.getVal<string>("canvas", "domain");
    this.canvasURL = `https://${institutionURL}${window.location.pathname}`;
  }

  ngOnInit(): void {}
}
