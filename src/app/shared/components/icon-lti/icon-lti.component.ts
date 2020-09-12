import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ExternalTool } from 'app/core/services/canvas/course/course';

@Component({
  selector: 'app-icon-lti',
  templateUrl: './icon-lti.component.html',
  styleUrls: ['./icon-lti.component.scss']
})
export class IconLTIComponent implements OnInit {
  @Input() lti?: ExternalTool;
  @Input() label?: string;
  
  constructor(private router: Router) { }

  ngOnInit(): void { }

  getSVGIconURL(name: string): string {
    const identifier = this.nameMapper(name);
    return `assets/integrations/icons.svg#${identifier}`;
  }

  // Matches Canvas integration name to asset name
  nameMapper(name: string): string {
    switch (name) {
      case "Flipgrid": return "flipgrid";
      case "Google Drive": return "googledrive";
      case "Khan Academy": return "khanacademy";
      case "OneNote Class Notebook": return "microsoftonenote";
      default: return name.toLowerCase().replace(' ', '');
    }
  }
}
