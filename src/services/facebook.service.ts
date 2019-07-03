import {Injectable} from '@angular/core';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {HttpService} from '../core/http.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {UserService} from './user.service';

@Injectable()
export class FacebookService {

    private faceBookUserId;

    constructor(private facebook: Facebook,
                private httpService: HttpService,
                private loginService: UserService,
                private storage: Storage,
                private router: Router
    ) {
    }

    facebookConnect() {
        this.facebook.login(['email']).then((response: FacebookLoginResponse) => {
            this.faceBookUserId = response.authResponse.userID;
            this.facebook.api('me?fields=email,name', []).then(user => {
                const validUSer = {mail: 'admin@wallamascotas.com', password: 'admin'};
                this.loginService.connect(validUSer).subscribe(
                    result => {
                        console.log('connected with user', result);
                    }, (e) => {
                        console.log('error conecct with fb', e);
                    },
                    () => {
                        this.storage.set('FB_USER', {mail: 'admin@wallamascots.com', password: 'admin'}).then((res) => {
                            this.httpService.authState.next(true);
                            console.log('registred in storage', res);
                            this.router.navigate(['/home']);
                        });
                    }
                );
            });

        });
    }

}
