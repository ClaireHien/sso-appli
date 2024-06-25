import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticFormComponent } from './statistic-form.component';

describe('StatisticFormComponent', () => {
  let component: StatisticFormComponent;
  let fixture: ComponentFixture<StatisticFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisticFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
