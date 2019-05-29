import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Camera, CameraOptions, PictureSourceType} from '@ionic-native/camera/ngx';
import {ActionSheetController} from '@ionic/angular';
import {File} from '@ionic-native/File/ngx';
import {Storage} from '@ionic/storage';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {Router} from '@angular/router';
import {AssociationService} from '../../../services/association.service';

@Component({
    selector: 'app-submit-asociation',
    templateUrl: './submit-asociation.page.html',
    styleUrls: ['./submit-asociation.page.scss'],
})
export class SubmitAsociationPage implements OnInit {

    static URL = 'asociation';
    pageTitle = 'Alta asociacion';
    submitAsociation: FormGroup;
    isSubmitted = false;
    typeAsociations = ['Asociacion', 'Casa de Acogida', 'Hogar Temporal', 'Otros'];
    typeShippings = ['No se realizan', 'Misma provincia', 'Toda España', 'Toda Europa'];
    imagesFromPhone = [];

    // Photos Storage
    STORAGE_KEY = 'my_images'; // we create our own folder
    storedImages = [];
    // Camera
    sourcePathImg = '/source/path/img';

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private associationService: AssociationService,
                private camera: Camera,
                public actionSheetController: ActionSheetController,
                private file: File,
                private storage: Storage,
                private webview: WebView,
                private filePath: FilePath,
                private changeRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.submitAsociation = this.formBuilder.group({
            name: ['', [Validators.required]],
            TLF: ['', [Validators.required]],
            country: ['', [Validators.required]],
            region: ['', [Validators.required]],
            type: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            description: ['', [Validators.required]],
            typeShipping: ['', [Validators.required]],
            web: ['']
        });
    }

    get fControls() {
        return this.submitAsociation.controls;
    }

    loadPictures(imagesTakenFromPhone: string[]) {
        this.imagesFromPhone = imagesTakenFromPhone;
    }

    onSubmit(submitAsocForm: FormGroup) {
        console.log('form submitted');
        this.isSubmitted = true;
        const newAssociation = submitAsocForm.value;

        if (this.submitAsociation.valid) {
            this.associationService.createAssociation(newAssociation).subscribe(
                res => console.log('Successs', res),
                (error) => console.log('Error submission', error)
            );
        }

    }
}
