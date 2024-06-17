import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CraftComponent } from './craft/craft.component';
import { WeaponComponent } from './weapon/weapon.component';
import { MagicComponent } from './magic/magic.component';
import { NeutralComponent } from './neutral/neutral.component';
import { FightComponent } from './fight/fight.component';
import { CharacterComponent } from './character/character.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artisanat', component: CraftComponent },
  { path: 'armes', component: WeaponComponent },
  { path: 'magies', component: MagicComponent },
  { path: 'neutre', component: NeutralComponent },
  { path: 'combat', component: FightComponent },
  { path: 'personnage/:characterId/:characterName', component: CharacterComponent },
  { path: 'profil/:userId/:userName', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    scrollPositionRestoration: 'enabled', // Restaurer la position de défilement
    anchorScrolling: 'enabled' // Activer le défilement d'ancre
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { } 