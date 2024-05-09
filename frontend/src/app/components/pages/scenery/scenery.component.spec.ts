import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneryComponent } from './scenery.component';

describe('SceneryComponent', () => {
  let component: SceneryComponent;
  let fixture: ComponentFixture<SceneryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SceneryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SceneryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
