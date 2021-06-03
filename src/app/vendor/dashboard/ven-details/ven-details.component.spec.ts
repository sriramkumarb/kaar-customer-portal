import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenDetailsComponent } from './ven-details.component';

describe('VenDetailsComponent', () => {
  let component: VenDetailsComponent;
  let fixture: ComponentFixture<VenDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
