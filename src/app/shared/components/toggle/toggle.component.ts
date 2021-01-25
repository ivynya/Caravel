import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {
  @Input() value: boolean;
  @Output() valueChange = new EventEmitter<boolean>();

  constructor() { }

  change(newVal: boolean) {
    this.value = newVal;
    this.valueChange.emit(this.value);
  }

}
