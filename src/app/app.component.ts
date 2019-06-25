import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {HttpService} from '../core/http.service';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
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
            url: '/pets',
            icon: 'paw'
        },
        {
            title: 'Dar de Alta',
            children: [
                {
                    title: 'Alta Mascota',
                    url: '/submit/pets',
                    icon: 'arrow-dropright'
                },
                {
                    title: 'Alta Asociacion',
                    url: '/submit/asociation',
                    icon: 'arrow-dropright'
                },
                {
                    title: 'Alta Servicio',
                    url: '/submit/services',
                    icon: 'arrow-dropright'
                },
            ]
        },
        {
            title: 'Asociaciones',
            url: '/associations',
            icon: 'business'
        }
    ];

    public loginPage = {
        title: 'Login',
        url: '/login',
        icon: 'log-in'
    };

    private authenticated = false;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private storage: Storage,
        private httpService: HttpService
    ) {
        this.initializeApp();
        this.checkAuthentication();

        this.httpService.isAuthenticated().subscribe(
            result => {
                this.authenticated = result;
            }
        );
    }

    checkAuthentication() {
        this.storage.get('FB_USER').then(user => {
            if (user) {
                this.httpService.authState.next(true);
                this.authenticated = true;
                console.log('state observable', this.httpService.authState.value);
                console.log('just launched', user.email);
            }
        });
            // .catch(e => console.log('error local storage', e));
    }

    logout() {
        this.httpService.logout();
        this.authenticated = false;
    }


    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
