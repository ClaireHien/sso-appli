import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-tree',
  templateUrl: './character-tree.component.html',
  styleUrl: './character-tree.component.scss'
})
export class CharacterTreeComponent implements OnInit{
  
  @Input() tree: any; 
  @Input() character: any; 
  @Input() createdByUser: any; 

  ngOnInit(): void {
    console.log(this.tree);
  }

  unlockSkill(){

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
