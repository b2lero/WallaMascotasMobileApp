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
        File,
        FilePath,
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
