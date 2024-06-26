import { Component,Input, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent implements OnInit {

  @Input() character: any; 
  @Input() type: any; 
  @Input() createdByUser: any;

  abreviation:any;
  statistics:any;
  
  ngOnInit(): void {

    if(this.type == "physical"){
      this.abreviation = ["FOR","CON","DEX","PER"]
    }
    if(this.type == "magic"){
      this.abreviation = ['INT','CHA','VIV','SENSI']
    }
    
  }

  searchStat(abreviation:string){
    const forStatistic = this.character.statistics.find(
      (stat: any) => stat.abreviation === abreviation
    );
    const statistic =  forStatistic.pivot.value + forStatistic.pivot.bonus
    return statistic;
  }
}
