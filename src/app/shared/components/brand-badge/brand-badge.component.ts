import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-brand-badge',
  templateUrl: './brand-badge.component.html',
  styleUrls: ['./brand-badge.component.scss']
})
export class BrandBadgeComponent implements AfterViewInit {
  @Input() plus = false;
  @ViewChild('brandBadge') badge: any;

  constructor() { }

  ngAfterViewInit(): void {
    if (window.navigator.userAgent.indexOf("Edg") > -1 ||
      window.navigator.userAgent.indexOf("Firefox") > -1)
      this.badge.nativeElement.classList.remove("non-edge-fix");
  }

}
