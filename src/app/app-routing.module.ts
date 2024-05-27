import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CraftComponent } from './craft/craft.component';
import { WeaponComponent } from './weapon/weapon.component';
import { MagicComponent } from './magic/magic.component';
import { NeutralComponent } from './neutral/neutral.component';
import { FightComponent } from './fight/fight.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artisanat', component: CraftComponent },
  { path: 'armes', component: WeaponComponent },
  { path: 'magies', component: MagicComponent },
  { path: 'neutre', component: NeutralComponent },
  { path: 'combat', component: FightComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { } 