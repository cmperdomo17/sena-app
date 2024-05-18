import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTeacherComponent } from './form-teacher.component';

describe('FormTeacherComponent', () => {
  let component: FormTeacherComponent;
  let fixture: ComponentFixture<FormTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormTeacherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
