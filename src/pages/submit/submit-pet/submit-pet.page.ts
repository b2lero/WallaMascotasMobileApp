import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PetService} from '../../../services/pet.service';
import {HttpService} from '../../../core/http.service';
import {Camera, CameraOptions, PictureSourceType} from '@ionic-native/camera/ngx';
import {ActionSheetController} from '@ionic/angular';
import {File} from '@ionic-native/File/ngx';
import {Storage} from '@ionic/storage';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';

@Component({
    selector: 'app-submit-pet',
    templateUrl: './submit-pet.page.html',
    styleUrls: ['./submit-pet.page.scss'],
})
export class SubmitPetPageComponent implements OnInit {

    static URL = 'pets';
    pageTitle = 'Alta Mascota';
    submitPetForm: FormGroup;
    typeAnimals = ['perro', 'gato', 'otro'];
    isSubmitted: boolean;
    hasChip = false;
    isVaccinated = false;
    isPositiveInLeukemia = false;
    isPositiveInLeismania = false;
    hasPppLicense = false;
    isSterilized = false;
    isInTreatment = false;
    isPositiveInFelineImmunodeficiency = false;
    // Photos Storage
    STORAGE_KEY = 'my_images'; // we create our own folder
    storedImages = [];
    // Camera
    sourcePathImg = '/source/path/img';

    constructor(
        private formBuilder: FormBuilder,
        private petService: PetService,
        private httpService: HttpService,
        private camera: Camera,
        public actionSheetController: ActionSheetController,
        private file: File,
        private storage: Storage,
        private webview: WebView,
        private filePath: FilePath
    ) {
    }

    ngOnInit() {
        this.submitPetForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            type: ['', [Validators.required]],
            breed: ['', [Validators.required]],
            country: ['', [Validators.required]],
            region: ['', [Validators.required]],
            description: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            size: ['', [Validators.required]],
            birthdate: ['', [Validators.required]],
            hasChip: [''],
            isVaccinated: [''],
            isPositiveInLeukemia: [''],
            isPositiveInLeismania: [''],
            hasPppLicense: [''],
            isSterilized: [''],
            isInTreatment: [''],
            isPositiveInFelineImmunodeficiency: ['']
        });
    }

    get fControls() {
        return this.submitPetForm.controls;
    }

    loadStoredImages() {
        this.storage.get(this.STORAGE_KEY).then(images => {
            if (images) {
                const arr = JSON.parse(images);
                this.storedImages = [];
                for (const img of arr) {
                    const localfilePath = this.file.dataDirectory + img;
                    const resolvedWebViewPath = this.pathForImage(localfilePath);
                    this.storedImages.push({name: img, path: resolvedWebViewPath, filePath: localfilePath});
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

    takePicture(sourceType: PictureSourceType) {
        const cameraOptions: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            cameraDirection: 0
        };

        this.camera.getPicture(cameraOptions)
            .then(imagePath => {
                // In this case the platform must be specified
                if (sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                    const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                    const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                    this.copyFileToLocalDir(currentName, correctPath, this.createFileName());
                }
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
                const newImages = [name];
                this.storage.set(this.STORAGE_KEY, JSON.stringify(newImages));
            } else {
                arr.push(name);
                this.storage.set(this.STORAGE_KEY, JSON.stringify(arr));
            }

            const localFilePath = this.file.dataDirectory + name;
            const resPath = this.pathForImage(localFilePath);

            const newEntry = {
                name: nameFileImage,
                path: resPath,
                filePath: localFilePath
            };

            this.storedImages = [newEntry, ...this.storedImages];
            this.ref.detectChanges(); // trigger change detection cycle
        });
    }


    onSubmit(submitFormPet: FormGroup) {
        this.isSubmitted = true;
        if (this.submitPetForm.valid) {
            const newPet = this.submitPetForm.value;

            this.petService.createPet(newPet).subscribe(
                response => console.log('--> response request post', response)
            );
        }
    }

}
