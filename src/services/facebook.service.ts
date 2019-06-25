import {Injectable} from '@angular/core';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {HttpService} from '../core/http.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

@Injectable()
export class FacebookService {

    private faceBookUserId;

    constructor(private facebook: Facebook,
                private httpService: HttpService,
                private storage: Storage,
                private router: Router
    ) {}

    facebookConnect() {
        this.facebook.login(['email']).then((response: FacebookLoginResponse) => {
            this.faceBookUserId = response.authResponse.userID;
            this.facebook.api('me?fields=email,name', []).then(user => {
                // TODO check user email exist
                this.storage.set('FB_USER', { name: user.name, email: user.email }).then((res) => {
                    this.httpService.authState.next(true);
                    console.log('registred in storage', res);
                    this.router.navigate(['/pets']);
                });
            });

        });
    }

}
