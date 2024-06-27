import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeutralSkillComponent } from './neutral-skill.component';

describe('NeutralSkillComponent', () => {
  let component: NeutralSkillComponent;
  let fixture: ComponentFixture<NeutralSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NeutralSkillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NeutralSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
