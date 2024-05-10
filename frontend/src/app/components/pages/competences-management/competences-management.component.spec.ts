import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencesManagementComponent } from './competences-management.component';

describe('CompetencesManagementComponent', () => {
  let component: CompetencesManagementComponent;
  let fixture: ComponentFixture<CompetencesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompetencesManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetencesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
