import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAmbientComponent } from './form-ambient.component';

describe('FormAmbientComponent', () => {
  let component: FormAmbientComponent;
  let fixture: ComponentFixture<FormAmbientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAmbientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAmbientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
