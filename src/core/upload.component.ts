import {ChangeDetectorRef, Component, Input, Output} from '@angular/core';
import {Camera, CameraOptions, PictureSourceType} from '@ionic-native/camera/ngx';
import {ActionSheetController} from '@ionic/angular';
import {File} from '@ionic-native/File/ngx';
import {Storage} from '@ionic/storage';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';

@Component({
    selector: 'app-upload',
    templateUrl: 'upload.component.html',
    styleUrls: ['upload.component.scss']

})

export class UploadComponent {
    // @Input() title: string;

    @Input() storedImages = []; // recibo
    STORAGE_KEY = 'my_images';
    sourcePathImg = '/source/path/img';

    constructor(
        private camera: Camera,
        public actionSheetController: ActionSheetController,
        private file: File,
        private storage: Storage,
        private webview: WebView,
        private filePath: FilePath,
        private changeRef: ChangeDetectorRef) {
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

            this.storedImages = [newEntry, ...this.storedImages];
            this.changeRef.detectChanges(); // trigger change detection cycle
        });
    }


}