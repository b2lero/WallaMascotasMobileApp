import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubmitAsociationPage } from './submit-asociation.page';
import {CoreModule} from '../../../core/core.module';

const routes: Routes = [
  {
    path: '',
    component: SubmitAsociationPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        CoreModule,
        ReactiveFormsModule
    ],
  declarations: [SubmitAsociationPage]
})
export class SubmitAsociationPageModule {}
