import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonInactivateComponent } from './button-inactivate.component';

describe('ButtonInactivateComponent', () => {
  let component: ButtonInactivateComponent;
  let fixture: ComponentFixture<ButtonInactivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonInactivateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonInactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
