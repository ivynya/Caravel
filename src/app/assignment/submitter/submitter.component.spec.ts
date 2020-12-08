import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitterComponent } from './submitter.component';

describe('SubmitterComponent', () => {
  let component: SubmitterComponent;
  let fixture: ComponentFixture<SubmitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
