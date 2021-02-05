import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseHomeComponent } from './course-home.component';
import { RoundDatePipe } from '../../core/pipes';

describe('CourseHomeComponent', () => {
  let component: CourseHomeComponent;
  let fixture: ComponentFixture<CourseHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseHomeComponent ],
      providers: [ RoundDatePipe ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
