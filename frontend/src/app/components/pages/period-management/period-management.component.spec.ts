import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodManagementComponent } from './period-management.component';

describe('PeriodManagementComponent', () => {
  let component: PeriodManagementComponent;
  let fixture: ComponentFixture<PeriodManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeriodManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeriodManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
