import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDarkmodeComponent } from './button-darkmode.component';

describe('ButtonDarkmodeComponent', () => {
  let component: ButtonDarkmodeComponent;
  let fixture: ComponentFixture<ButtonDarkmodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonDarkmodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonDarkmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
