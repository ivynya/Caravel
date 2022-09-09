import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService } from '../../../core/services';

@Component({
  selector: 'app-open-from-here',
  templateUrl: './open-from-here.component.html',
  styleUrls: ['./open-from-here.component.scss']
})
export class OpenFromHereComponent implements OnInit {
  @Input() text?: string;
  @Input() url?: string;

  constructor(private config: ConfigurationService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    if (!this.url) {
      this.route.params.subscribe(() => {
        const domain = this.config.getVal<string>("canvas", "domain");
        this.url = `https://${domain}${this.router.url}`;
      });
    }
  }

}
