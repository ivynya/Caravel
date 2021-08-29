import { Injectable, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _modalOpened = new Subject<TemplateRef<any>>();
  public modalOpened: Observable<TemplateRef<any>>;
  private _modalClosed = new Subject<void>();
  public modalClosed: Observable<void>;

  constructor() {
    this.modalOpened = this._modalOpened.asObservable();
    this.modalClosed = this._modalClosed.asObservable();
  }

  openModal(template: TemplateRef<any>): void {
    this._modalOpened.next(template);
  }

  closeModal(): void {
    this._modalClosed.next();
  }
}
