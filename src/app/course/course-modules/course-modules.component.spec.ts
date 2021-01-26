import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseModulesComponent } from './course-modules.component';

describe('CourseModulesComponent', () => {
  let component: CourseModulesComponent;
  let fixture: ComponentFixture<CourseModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseModulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
