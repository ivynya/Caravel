import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAnnouncementsComponent } from './course-announcements.component';

describe('CourseAnnouncementsComponent', () => {
  let component: CourseAnnouncementsComponent;
  let fixture: ComponentFixture<CourseAnnouncementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAnnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
