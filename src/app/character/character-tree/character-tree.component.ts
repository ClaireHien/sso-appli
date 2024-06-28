import { Component,Input, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service'
import { ReloadDataService } from '../../services/reload-data.service';

@Component({
  selector: 'app-character-tree',
  templateUrl: './character-tree.component.html',
  styleUrl: './character-tree.component.scss'
})
export class CharacterTreeComponent implements OnInit{
  
  @Input() tree: any; 
  @Input() character: any; 
  @Input() createdByUser: any; 

  
  constructor(
    private reloadDataService: ReloadDataService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
  }


  backendUrl = environment.backendUrl;

  unlockSkill(type:string, idSkill:number){
    const id = this.route.snapshot.paramMap.get('characterId');
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    this.http.put(`${this.backendUrl}/character/${id}/update-skill/${type}/${idSkill}`, {}, { headers }).subscribe(
      (data) => {
        this.reloadDataService.triggerReload();
      },
      (error) => {
        console.error('Erreur', error);
      }
    );
  }

  characterHaveSkill(skillId: number): boolean {
    return this.character.skills.some((skill: { id: number; name: string }) => skill.id === skillId); // Type inline ici aussi
  }
  characterHaveUpgrade(skillId: number): boolean {
    return this.character.skills.some((skill: { id: number; name: string; pivot: { upgrade_unlock: number } }) => 
      skill.id === skillId && skill.pivot.upgrade_unlock === 1
    );
  }
  characterHaveUpgradeUltimate(skillId: number): boolean {
    return this.character.skills.some((skill: { id: number; name: string; pivot: { ultimate_upgrade_unlock: number } }) => 
      skill.id === skillId && skill.pivot.ultimate_upgrade_unlock === 1
    );
  }
}
