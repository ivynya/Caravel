import { Component, OnInit, TemplateRef } from '@angular/core';

import { ModalService } from '../../../core/services';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  collapsed = true;
  template: TemplateRef<any> | undefined = undefined;
  
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.modalOpened.subscribe({
      next: this.show.bind(this)
    });
  }

  show(template: TemplateRef<any> | undefined): void {
    if (template) {
      this.collapsed = false;
      this.template = template;
    }
  }

  collapse(): void {
    this.collapsed = true;
  }

  stopProp(event: Event): void {
    event.stopPropagation();
  }

}
