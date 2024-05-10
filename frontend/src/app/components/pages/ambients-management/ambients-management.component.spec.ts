import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbientsManagementComponent } from './ambients-management.component';

describe('AmbientsManagementComponent', () => {
  let component: AmbientsManagementComponent;
  let fixture: ComponentFixture<AmbientsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmbientsManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmbientsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
