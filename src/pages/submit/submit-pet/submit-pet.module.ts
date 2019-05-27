import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubmitPetPageComponent } from './submit-pet.page';
import {CoreModule} from '../../../core/core.module';
import {SubmitAsociationPageModule} from '../submit-asociation/submit-asociation.module';

const routes: Routes = [
  {
    path: '',
    component: SubmitPetPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CoreModule,
    ReactiveFormsModule,
    SubmitAsociationPageModule
  ],
  declarations: [SubmitPetPageComponent]
})
export class SubmitPetPageModule {}
