import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAnnouncementComponent } from './course-announcement.component';

describe('CourseAnnouncementComponent', () => {
  let component: CourseAnnouncementComponent;
  let fixture: ComponentFixture<CourseAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
