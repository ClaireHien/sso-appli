import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CraftComponent } from './skill-book/craft/craft.component';
import { WeaponComponent } from './skill-book/weapon/weapon.component';
import { MagicComponent } from './skill-book/magic/magic.component';
import { NeutralComponent } from './skill-book/neutral/neutral.component';
import { FightComponent } from './skill-book/fight/fight.component';
import { CharacterComponent } from './character/character.component';
import { ProfileComponent } from './profile/profile.component';
import { WorldComponent } from './world/world.component';
import { MessagePageComponent } from './message-page/message-page.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'message', component: MessagePageComponent },
  { path: 'artisanat', component: CraftComponent },
  { path: 'armes', component: WeaponComponent },
  { path: 'magies', component: MagicComponent },
  { path: 'neutre', component: NeutralComponent },
  { path: 'combat', component: FightComponent },
  { path: 'les-univers', component: WorldComponent },
  { path: 'personnage/:characterId', component: CharacterComponent },
  { path: 'personnage/:characterId/:characterName', component: CharacterComponent },
  { path: 'profil/:userId', component: ProfileComponent },
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