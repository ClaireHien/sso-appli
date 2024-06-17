import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeCardComponent } from './tree-card.component';

describe('TreeCardComponent', () => {
  let component: TreeCardComponent;
  let fixture: ComponentFixture<TreeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreeCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
