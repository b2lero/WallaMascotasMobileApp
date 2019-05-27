import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {HttpService} from './http.service';
import {HeaderComponent} from './header.component';
import {IonicModule} from '@ionic/angular';
import {ImageUploadComponent} from '../shared/image-upload.component';
import {ProfileViewComponent} from '../shared/profile-view.component';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        FormsModule,
        HttpClientModule,
        IonicModule,
        CommonModule
    ],
    declarations: [
        HeaderComponent,
        ImageUploadComponent,
        ProfileViewComponent
    ],
    exports: [
        HeaderComponent,
        ImageUploadComponent,
        ProfileViewComponent
    ],
    entryComponents: [
    ],
    providers: [
        HttpService
    ]
})

export class CoreModule {}
