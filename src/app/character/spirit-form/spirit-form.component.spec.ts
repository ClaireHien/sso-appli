import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiritFormComponent } from './spirit-form.component';

describe('SpiritFormComponent', () => {
  let component: SpiritFormComponent;
  let fixture: ComponentFixture<SpiritFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpiritFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpiritFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
