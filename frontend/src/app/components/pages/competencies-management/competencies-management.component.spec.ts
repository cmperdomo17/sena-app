import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenciesManagementComponent } from './competencies-management.component';

describe('CompetenciesManagementComponent', () => {
  let component: CompetenciesManagementComponent;
  let fixture: ComponentFixture<CompetenciesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompetenciesManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetenciesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
