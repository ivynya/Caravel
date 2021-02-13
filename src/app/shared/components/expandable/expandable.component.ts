import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss']
})
export class ExpandableComponent {
  @Input() name: string;
  @Input() bold = false;
  @Input() opened = false;
  @Output() expanded: EventEmitter<void>;

  constructor() {
    this.expanded = new EventEmitter<void>();
  }

  clicked(): void {
    this.opened = !this.opened;
    if (this.opened) this.expanded.emit();
  }

}
