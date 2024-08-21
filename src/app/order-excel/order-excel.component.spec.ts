import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderExcelComponent } from './order-excel.component';

describe('OrderExcelComponent', () => {
  let component: OrderExcelComponent;
  let fixture: ComponentFixture<OrderExcelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderExcelComponent]
    });
    fixture = TestBed.createComponent(OrderExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
