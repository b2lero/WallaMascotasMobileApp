import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {HttpService} from './http.service';
import {HeaderComponent} from './header.component';
import {IonicModule} from '@ionic/angular';
import {UploadComponent} from './upload.component';

@NgModule({
    imports: [
        FormsModule,
        HttpClientModule,
        IonicModule,
    ],
    declarations: [
        HeaderComponent,
        UploadComponent
    ],
    exports: [
        HeaderComponent,
        UploadComponent
    ],
    entryComponents: [
    ],
    providers: [
        HttpService
    ]
})

export class CoreModule {}
