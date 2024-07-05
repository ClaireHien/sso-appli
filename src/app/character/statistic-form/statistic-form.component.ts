import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service'
import { ReloadDataService } from '../../services/reload-data.service';

@Component({
  selector: 'app-statistic-form',
  templateUrl: './statistic-form.component.html',
  styleUrl: './statistic-form.component.scss'
})
export class StatisticFormComponent {

  formCharacter: FormGroup;  
  
  @Input() character: any;  
  @Input() type: any; 
  @Output() formSubmitted = new EventEmitter<void>();
  
  constructor(
    private reloadDataService: ReloadDataService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private authService: AuthService,
  ) {
    this.formCharacter = this.fb.group({
      stat0: ['', Validators.required],
      stat1: ['', Validators.required],
      stat2: ['', Validators.required],
      stat3: ['', Validators.required],
      stat0_bonus: ['', Validators.required],
      stat1_bonus: ['', Validators.required],
      stat2_bonus: ['', Validators.required],
      stat3_bonus: ['', Validators.required],
    });
  }

  abreviation:any;
  
  stat0:number =0;
  stat1:number =0;
  stat2:number =0;
  stat3:number =0;
  statAdd0:number =0;
  statAdd1:number =0;
  statAdd2:number =0;
  statAdd3:number =0;
  stat0_bonus:number =0;
  stat1_bonus:number =0;
  stat2_bonus:number =0;
  stat3_bonus:number =0;

  stat0Visible: boolean= true;
  stat1Visible: boolean= true;
  stat2Visible: boolean= true;
  stat3Visible: boolean= true;

  pc:number=0;
  free_stat:number=0;
  
  ngOnInit(): void {

    if(this.type == "physical"){
      this.abreviation = ["FOR","CON","DEX","PER"]
    }
    if(this.type == "magic"){
      this.abreviation = ['INT','CHA','VIV','SENSI']
    }

    this.stat0 = this.valueStat(this.abreviation[0]).pivot.value
    if (this.valueStat(this.abreviation[0]).pivot.value == 100){this.stat0Visible = false;}
    this.stat0_bonus = this.valueStat(this.abreviation[0]).pivot.bonus
    this.stat1 = this.valueStat(this.abreviation[1]).pivot.value
    if (this.valueStat(this.abreviation[1]).pivot.value == 100){this.stat1Visible = false;}
    this.stat1_bonus = this.valueStat(this.abreviation[1]).pivot.bonus
    this.stat2 = this.valueStat(this.abreviation[2]).pivot.value
    if (this.valueStat(this.abreviation[2]).pivot.value == 100){this.stat2Visible = false;}
    this.stat2_bonus = this.valueStat(this.abreviation[2]).pivot.bonus
    this.stat3 = this.valueStat(this.abreviation[3]).pivot.value
    if (this.valueStat(this.abreviation[3]).pivot.value == 100){this.stat3Visible = false;}
    this.stat3_bonus = this.valueStat(this.abreviation[3]).pivot.bonus

    this.formCharacter = this.fb.group({
      stat0: [this.stat0],
      stat0_bonus: [this.stat0_bonus],
      stat1: [this.stat1],
      stat1_bonus: [this.stat1_bonus],
      stat2: [this.stat2],
      stat2_bonus: [this.stat2_bonus],
      stat3: [this.stat3],
      stat3_bonus: [this.stat3_bonus]
    });
    
    if(this.character.pc === 0 && this.character.free_stat === 0){this.pcEnough = false;}
    this.pc = this.character.pc;
    this.free_stat = this.character.free_stat;

  }

  valueStat(abreviation:string){
    return this.character.statistics.find(
      (stat: { abreviation: string; pivot: { value: number; bonus: number } }) => stat.abreviation === abreviation
    );
  }

  pcEnough:boolean = true;
  backendUrl = environment.backendUrl;

  addStat(stat:any){
    switch (stat) {
      case 0:
        this.statAdd0 +=1;
        this.formCharacter.get('stat0')?.setValue(this.formCharacter.get('stat0')?.value + 1);
        if (this.formCharacter.value.stat0 == 100){this.stat0Visible = false;}
        break;
      case 1:
        this.statAdd1 +=1;
        this.formCharacter.get('stat1')?.setValue(this.formCharacter.get('stat1')?.value + 1);
        if (this.formCharacter.value.stat1 == 100){this.stat1Visible = false;}
        break;
      case 2:
        this.statAdd2 +=1;
        this.formCharacter.get('stat2')?.setValue(this.formCharacter.get('stat2')?.value + 1);
        if (this.formCharacter.value.stat2 == 100){this.stat2Visible = false;}
        break;
      case 3:
        this.statAdd3 +=1;
        this.formCharacter.get('stat3')?.setValue(this.formCharacter.get('stat3')?.value + 1);
        if (this.formCharacter.value.stat3 == 100){this.stat3Visible = false;}
        break;
    }

    if (this.free_stat == 0){
      if (this.pc == 0){
        this.pcEnough = false;
      } else {
        this.pc -= 1;
        this.free_stat +=2;
      }
    } else {
      this.free_stat -= 1;
      if (this.free_stat ==0 && this.pc == 0){
        
        this.pcEnough = false;
      }
    }
  }

  onSubmitCharacter(){

    const id = this.route.snapshot.paramMap.get('characterId');
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    this.http.put(`${this.backendUrl}/character/${id}/statistic/${this.type}/${this.pc}/${this.free_stat}`,
       this.formCharacter.value, { headers }).subscribe(
      (data) => {
        this.reloadDataService.triggerReload();
        this.formSubmitted.emit();
      },
      (error) => {
        console.error('Erreur', error);
      }
    );
  }
}
