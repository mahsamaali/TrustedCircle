import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSysComponent } from './review-sys.component';

describe('ReviewSysComponent', () => {
  let component: ReviewSysComponent;
  let fixture: ComponentFixture<ReviewSysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewSysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
