import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from '../core/core.module';
import {PetService} from '../services/pet.service';
import {UserService} from '../services/user.service';
import {IonicStorageModule} from '@ionic/storage';
import {Camera} from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/File/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {AssociationService} from '../services/association.service';
import {ProfessionalServService} from '../services/professional-serv.service';
import {Facebook} from '@ionic-native/facebook/ngx';
import {NotificationService} from '../services/notification.service';
import {FacebookService} from '../services/facebook.service';
import {CountryService} from '../services/country.service';
import {CameraService} from '../services/camera.service';
import {ChangeDetectorStatus} from '@angular/core/src/change_detection/constants';

@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        CoreModule,
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        AssociationService,
        Camera,
        CameraService,
        CountryService,
        Facebook,
        FacebookService,
        File,
        FilePath,
        NotificationService,
        PetService,
        ProfessionalServService,
        StatusBar,
        SplashScreen,
        UserService,
        WebView,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
