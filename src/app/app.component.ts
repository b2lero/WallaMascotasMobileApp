import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {HttpService} from '../core/http.service';
import {Storage} from '@ionic/storage';

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
        },
        {
            title: 'Asociaciones',
            url: '/associations'
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
            console.log('user auth', user);
            if (user.name) {
                this.httpService.authState.next(true);
                this.authenticated = true;
                console.log('state observable', this.httpService.authState.value);
            }
            console.log('just launched', user.email) ;
        }).catch(e => console.log('error local storage', e));

        // this.storage.get('USER_INFO').then(user => {
        //   //  this.authenticated = true;
        //     console.log('user info auth', user);
        //     if (user.username) {
        //         this.authenticated = true;
        //         //this.httpService.authState.next(true);
        //
        //         //console.log('state observable', this.httpService.authState.value);
        //     }
        //     console.log('just launched', user.email) ;
        // }).catch(e => console.log('error local storage', e));

        /*this.httpService.isAuthenticated().subscribe((respuesta => {
            if(respuesta) {
                this.authenticated = true;
                console.log(respuesta);
                this.faceb();
            }
        }));
*/
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
