import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessorComponent } from './accessor.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccessorComponent', () => {
  let component: AccessorComponent;
  let fixture: ComponentFixture<AccessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccessorComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    window.localStorage.setItem("oauth_token", "test");
    
    fixture = TestBed.createComponent(AccessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
