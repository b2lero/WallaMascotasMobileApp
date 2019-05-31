import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PetProfilePageComponent } from './pet-profile.page';
import {CoreModule} from '../../../../core/core.module';

const routes: Routes = [
  {
    path: '',
    component: PetProfilePageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PetProfilePageComponent]
})
export class PetProfilePageModule {}
