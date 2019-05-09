import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  // URL LINKS HERE CANNOT BE TOUCHED !!!!
  // Side Menu
  public appPages = [
    {
      title: 'home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Adoptar',
      url: '/adopt',
      children: [
        {
          title: 'Adoptar un perro',
          url: '/PETS'
        },
        {
          title: 'Adoptar  un gato',
          url: '/CATS'
        },
        {
          title: 'Adoptar otra mascotas',
          url: '/OTHERANIMALS'
        }
      ]
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
