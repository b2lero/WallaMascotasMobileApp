import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {HttpService} from './http.service';
import {HeaderComponent} from './header.component';
import {IonicModule} from '@ionic/angular';
import {ImageUploadComponent} from '../shared/image-upload.component';
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
    ],
    exports: [
        HeaderComponent,
        ImageUploadComponent,
    ],
    entryComponents: [
    ],
    providers: [
        HttpService
    ]
})

export class CoreModule {}
