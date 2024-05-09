import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentManagementComponent } from './environment-management.component';

describe('EnvironmentManagementComponent', () => {
  let component: EnvironmentManagementComponent;
  let fixture: ComponentFixture<EnvironmentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvironmentManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnvironmentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
