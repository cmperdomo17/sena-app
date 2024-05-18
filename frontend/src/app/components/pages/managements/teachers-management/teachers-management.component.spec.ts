import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersManagementComponent } from './teachers-management.component';

describe('TeachersManagementComponent', () => {
  let component: TeachersManagementComponent;
  let fixture: ComponentFixture<TeachersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeachersManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeachersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
