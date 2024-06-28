import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralRulesComponent } from './general-rules.component';

describe('GeneralRulesComponent', () => {
  let component: GeneralRulesComponent;
  let fixture: ComponentFixture<GeneralRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralRulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
