import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePageComponent {
  static URL = 'home';
  private pageTitle = 'WallaMascotas';

  constructor() {

  }

}


