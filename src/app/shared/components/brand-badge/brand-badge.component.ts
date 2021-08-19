import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-badge',
  templateUrl: './brand-badge.component.html',
  styleUrls: ['./brand-badge.component.scss']
})
export class BrandBadgeComponent implements OnInit {
  @Input() plus = false;

  constructor() { }

  ngOnInit(): void {
  }

}
