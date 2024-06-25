import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
 
import { RouterModule } from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CraftComponent } from './skill-book/craft/craft.component';
import { WeaponComponent } from './skill-book/weapon/weapon.component';
import { MagicComponent } from './skill-book/magic/magic.component';
import { NeutralComponent } from './skill-book/neutral/neutral.component';
import { FightComponent } from './skill-book/fight/fight.component';
import { ProfileComponent } from './profile/profile.component';
import { CharacterComponent } from './character/character.component';
import { CharacterCardComponent } from './modules/character-card/character-card.component';
import { TreeCardComponent } from './modules/tree-card/tree-card.component';
import { WorldComponent } from './world/world.component';
import { MessagePageComponent } from './message-page/message-page.component';
import { GlobalComponent } from './character/global/global.component';
import { GlobalFormComponent } from './character/global-form/global-form.component';
import { SpiritComponent } from './character/spirit/spirit.component';
import { SpiritFormComponent } from './character/spirit-form/spirit-form.component';
import { StatisticComponent } from './character/statistic/statistic.component';
import { StatisticFormComponent } from './character/statistic-form/statistic-form.component';
import { MainStatisticComponent } from './character/main-statistic/main-statistic.component';
import { MainStatisticFormComponent } from './character/main-statistic-form/main-statistic-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CraftComponent,
    WeaponComponent,
    MagicComponent,
    NeutralComponent,
    FightComponent,
    ProfileComponent,
    CharacterComponent,
    CharacterCardComponent,
    TreeCardComponent,
    WorldComponent,
    MessagePageComponent,
    GlobalComponent,
    GlobalFormComponent,
    SpiritComponent,
    SpiritFormComponent,
    StatisticComponent,
    StatisticFormComponent,
    MainStatisticComponent,
    MainStatisticFormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
