import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-statistic',
  templateUrl: './main-statistic.component.html',
  styleUrl: './main-statistic.component.scss'
})
export class MainStatisticComponent {

  @Input() character: any; 
}
