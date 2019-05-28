import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {HomePageComponent} from './home.page';
import {CoreModule} from '../../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent
      }
    ]),
    CoreModule
  ],
  declarations: [HomePageComponent]
})
export class HomePageModule {}
