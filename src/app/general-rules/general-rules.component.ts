import { Component } from '@angular/core';
import { StatusService } from '../services/status.service';
import { Tree, Stereotype, Range, Statistic, TypeDamage,Status } from '../tree.type'; // Importation des interfaces


@Component({
  selector: 'app-general-rules',
  templateUrl: './general-rules.component.html',
  styleUrl: './general-rules.component.scss'
})
export class GeneralRulesComponent {

  ong: string = 'crea';
  errorCode: boolean = false;
  statuses: any[] = [];
  
  constructor(
    private statusService: StatusService,
  ) { }

  
  ngOnInit() {
    this.statusService.getStatuses().subscribe(
      (data: Status[]) => {
        this.statuses = data;
      },
      error => {
        console.error('Error fetching damage', error);
      }
    );
    
  }
 
  clickOng(ong:string){
    this.ong=ong;
  }
}
 