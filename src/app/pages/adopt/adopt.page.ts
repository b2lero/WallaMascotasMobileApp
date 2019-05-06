import { Component } from '@angular/core';
import {Pet} from '../../../models/pet.model';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.page.html',
  styleUrls: ['./adopt.page.scss'],
})
export class AdoptPageComponent {

  static URL = 'adopt';
  private pageTitle = 'Adoptar una mascota';

  pets: Pet[];

  constructor() {

  }

}
