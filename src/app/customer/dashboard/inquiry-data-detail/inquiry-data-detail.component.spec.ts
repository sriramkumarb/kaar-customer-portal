import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryDataDetailComponent } from './inquiry-data-detail.component';

describe('InquiryDataDetailComponent', () => {
  let component: InquiryDataDetailComponent;
  let fixture: ComponentFixture<InquiryDataDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryDataDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryDataDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
