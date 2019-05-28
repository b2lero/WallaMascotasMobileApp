import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdoptPageComponent } from './adopt.page';
import {CoreModule} from '../../../core/core.module';

const routes: Routes = [
  {
    path: '',
    component: AdoptPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CoreModule
  ],
  declarations: [AdoptPageComponent]
})
export class AdoptPageModule {}
