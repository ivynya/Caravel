import { Injectable, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _modalOpened = new Subject<TemplateRef<any>>();
  public modalOpened: Observable<TemplateRef<any>>;

  constructor() {
    this.modalOpened = this._modalOpened.asObservable();
  }

  openModal(template: TemplateRef<any>): void {
    this._modalOpened.next(template);
  }
}
