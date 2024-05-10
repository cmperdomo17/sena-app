import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCompetenceComponent } from './form-competence.component';

describe('FormCompetenceComponent', () => {
  let component: FormCompetenceComponent;
  let fixture: ComponentFixture<FormCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCompetenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
