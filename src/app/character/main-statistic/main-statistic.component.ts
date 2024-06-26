import { Component, OnInit, Input, EventEmitter, Output,ChangeDetectorRef   } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service'
import { ReloadDataService } from '../../services/reload-data.service';


@Component({
  selector: 'app-main-statistic',
  templateUrl: './main-statistic.component.html',
  styleUrl: './main-statistic.component.scss'
})
export class MainStatisticComponent implements OnInit{

  @Input() character: any; 
  @Input() createdByUser: any;

  formEditPV: FormGroup;  
  
  @Output() formSubmitted = new EventEmitter<void>();
  
  constructor(
    private reloadDataService: ReloadDataService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef 
  ) {
    this.formEditPV = this.fb.group({
      damageValue: ['0', Validators.required],
      healValue: ['0', Validators.required]
    });
  }
  
  optionIsOpen:boolean = false;
  backendUrl = environment.backendUrl;

  openOption(){
    this.optionIsOpen = !this.optionIsOpen;
  }

  pts_tech:number=0;
  pts_esp:number=0;
  checkPV: number=1;
  ngOnInit(): void {
    this.heartBeat(this.character.pv);
    this.pts_tech = +this.character.pt_max + +this.character.pt_bonus
    this.pts_esp = +this.character.pe_max + +this.character.pe_bonus
  }
  
  heartBeat(pv:number){
    const fullPV = this.character.pv_max + this.character.pv_bonus;
    if (pv < 1){this.checkPV= 0;}
    else if (fullPV/2 > pv) { this.checkPV = 2;}
    else { this.checkPV = 1;}
    this.cdr.detectChanges(); 
  }

  pt(){
    if(this.createdByUser){
      if (this.pts_tech > 0){
        this.pts_tech -= 1; 
      } else {
        this.pts_tech = this.character.pt_max + this.character.pt_bonus; 
      }
    }
  }

  pe(){
    if(this.createdByUser){
      if (this.pts_esp > 0){
        this.pts_esp -= 1; 
      } else {
        this.pts_esp = this.character.pe_max + this.character.pe_bonus; 
      }
    }
  }

  onSubmitEditPV(action: string) {

    if(this.formEditPV.value.damageValue !== "0" || this.formEditPV.value.healValue !== "0" || action == "fullHeal"){
    
      const id = this.route.snapshot.paramMap.get('characterId');
      const token = this.cookieService.get('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });

      this.http.put(`${this.backendUrl}/character/${id}/pv/${action}`,
        this.formEditPV.value, { headers }).subscribe(
        (data: any) => {
          console.log(data);
          this.reloadDataService.triggerReload();
          this.formSubmitted.emit();
          this.formEditPV.reset({ healValue: 0, damageValue:0 });
          this.heartBeat(data.pv);
        },
        (error) => {
          console.error('Erreur', error);
        }
      );
    }


  }

}
