import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaySlipDetailsComponent } from './pay-slip-details.component';

describe('PaySlipDetailsComponent', () => {
  let component: PaySlipDetailsComponent;
  let fixture: ComponentFixture<PaySlipDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaySlipDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaySlipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
