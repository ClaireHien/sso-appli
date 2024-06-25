import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStatisticFormComponent } from './main-statistic-form.component';

describe('MainStatisticFormComponent', () => {
  let component: MainStatisticFormComponent;
  let fixture: ComponentFixture<MainStatisticFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainStatisticFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainStatisticFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
