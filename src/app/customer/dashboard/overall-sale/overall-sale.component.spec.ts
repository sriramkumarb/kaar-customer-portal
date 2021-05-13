import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallSaleComponent } from './overall-sale.component';

describe('OverallSaleComponent', () => {
  let component: OverallSaleComponent;
  let fixture: ComponentFixture<OverallSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
