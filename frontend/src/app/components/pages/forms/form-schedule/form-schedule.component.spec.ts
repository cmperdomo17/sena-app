import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormScheduleComponent } from './form-schedule.component';

describe('FormScheduleComponent', () => {
  let component: FormScheduleComponent;
  let fixture: ComponentFixture<FormScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
