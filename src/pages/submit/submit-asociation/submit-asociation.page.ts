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
export class SubmitAsociationPageComponent implements OnInit {

    static URL = 'asociation';
    pageTitle = 'Alta asociacion';
    submitAsociation: FormGroup;
    isSubmitted = false;
    typeAsociations = ['Asociacion', 'Casa de Acogida', 'Hogar Temporal', 'Otros'];
    typeShippings = ['No se realizan', 'Misma provincia', 'Toda España', 'Toda Europa'];
    storedImagesAssociations = [];

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

    loadStoredImages() {
        this.storage.get(this.STORAGE_KEY).then(images => {
            if (images) {
                const arr = JSON.parse(images);
                this.storedImages = [];
                for (const img of arr) {
                    const localfilePath = this.file.dataDirectory + img;
                    const resolvedWebViewPath = this.pathForImage(localfilePath);
                    this.storedImagesAssociations.push({name: img, path: resolvedWebViewPath, filePath: localfilePath});
                }
            }
        });
    }

    pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return this.webview.convertFileSrc(img);
        }
    }

    async submitPhoto() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Albums',
            buttons: [{
                text: 'Subir desde Galeria',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    console.log('Subir desde Galeria');
                }
            }, {
                text: 'Utilizar Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                    console.log('Photo clicked');
                }
            }, {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }

    createFileName() {
        const d = new Date();
        return d.getTime() + '_IOS_IMAGE' + '.jpg';
    }

    takePicture(deviceSourceType: PictureSourceType) {
        const cameraOptions: CameraOptions = {
            quality: 100,
            sourceType: deviceSourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        this.camera.getPicture(cameraOptions)
            .then(imagePath => {
                const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            });
    }

    copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
            this.updateStoredImages(newFileName);
        }, error => {
            console.log('Error copying to local dir', error);
        });
    }

    updateStoredImages(nameFileImage) {
        this.storage.get(this.STORAGE_KEY).then(images => {
            const arr = JSON.parse(images);
            if (!arr) {
                const newImages = [nameFileImage];
                this.storage.set(this.STORAGE_KEY, JSON.stringify(newImages));
            } else {
                arr.push(nameFileImage);
                this.storage.set(this.STORAGE_KEY, JSON.stringify(arr));
            }

            const localFilePath = this.file.dataDirectory + nameFileImage;
            const resPath = this.pathForImage(localFilePath);

            const newEntry = {
                name: nameFileImage,
                path: resPath,
                filePath: localFilePath
            };

            this.storedImagesAssociations = [newEntry, ...this.storedImagesAssociations];
            this.changeRef.detectChanges(); // trigger change detection cycle
        });
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
