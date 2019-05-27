import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {HttpService} from '../core/http.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    public appPages = [
        {
            title: 'home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Adoptar',
            url: '/pets'
        },
        {
            title: 'Alta mascota',
            url: '/submit/pets'
        },
        {
            title: 'Alta Asociacion',
            url: '/submit/asociation'
        },
        {
            title: 'Alta Servicio',
            url: '/submit/services'
        }
    ];

    public loginPage = {
        title: 'Login',
        url: '/login',
        icon: 'log-in'
    };

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authentication: HttpService
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
