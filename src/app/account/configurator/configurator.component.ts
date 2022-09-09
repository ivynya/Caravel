import { Component, OnInit } from '@angular/core';

import { ConfigurationService } from '../../core/services';
import { Configuration } from '../../core/schemas';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit {
  configuration: Configuration;

  constructor(private config: ConfigurationService) { }

  ngOnInit(): void {
    this.config.config.subscribe(data => {
      this.configuration = data;

      // Change app theme if it is updated
      const theme = this.configuration["caravel"]["theme"].value;
      document.documentElement.setAttribute('theme', theme);

      const accent = this.configuration["caravel"]["accent"].value;
      document.documentElement.setAttribute('accent', accent);
    });
  }

  // Updates an item in the cache
  upd(scope: string, key: string, val: any): void {
    this.config.set(scope, key, val);
  }
}
