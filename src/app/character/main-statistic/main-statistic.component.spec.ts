import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStatisticComponent } from './main-statistic.component';

describe('MainStatisticComponent', () => {
  let component: MainStatisticComponent;
  let fixture: ComponentFixture<MainStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainStatisticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
