import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterTreeComponent } from './character-tree.component';

describe('CharacterTreeComponent', () => {
  let component: CharacterTreeComponent;
  let fixture: ComponentFixture<CharacterTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
