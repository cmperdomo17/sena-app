import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPeriodComponent } from './form-period.component';

describe('FormPeriodComponent', () => {
  let component: FormPeriodComponent;
  let fixture: ComponentFixture<FormPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPeriodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
