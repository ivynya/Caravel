import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OpenFromHereComponent } from './open-from-here.component';

describe('OpenFromHereComponent', () => {
  let component: OpenFromHereComponent;
  let fixture: ComponentFixture<OpenFromHereComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenFromHereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenFromHereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
