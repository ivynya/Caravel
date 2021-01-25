import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ExternalTool } from '../../../core/schemas';

@Component({
  selector: 'app-icon-lti',
  templateUrl: './icon-lti.component.html',
  styleUrls: ['./icon-lti.component.scss']
})
export class IconLTIComponent {
  @Input() lti?: ExternalTool;
  @Input() label?: string;
  
  constructor(private router: Router) {}

  getSVGIconURL(name: string): string {
    const identifier = this.nameMapper(name);
    return `assets/integrations/icons.svg#${identifier}`;
  }

  // Matches Canvas integration name to asset name
  nameMapper(name: string): string {
    switch (name) {
      case "Flipgrid":
        return "flipgrid";
      case "GitHubClassroom":
        return "github";
      case "Google Drive":
        return "googledrive";
      case "Khan Academy":
        return "khanacademy";
      case "OneNote Class Notebook":
        return "onenote";
      default:
        return name.toLowerCase().replace(' ', '');
    }
  }
}
