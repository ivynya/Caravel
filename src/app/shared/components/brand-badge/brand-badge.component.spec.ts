import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandBadgeComponent } from './brand-badge.component';

describe('BrandBadgeComponent', () => {
  let component: BrandBadgeComponent;
  let fixture: ComponentFixture<BrandBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
