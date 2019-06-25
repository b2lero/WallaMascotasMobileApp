import {Injectable} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ActionSheetController, Platform} from '@ionic/angular';
import {File, FileEntry} from '@ionic-native/File/ngx';
import {Storage} from '@ionic/storage';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import {Subject} from 'rxjs';
import {FilePath} from '@ionic-native/file-path/ngx';

@Injectable()
export class CameraService {

    storedImages = [];
    STORAGE_KEY = 'my_images';
    sourcePathImg = '/source/path/img';
    imagesTaken: Subject<any[]> = new Subject();
    cameraOptions: CameraOptions;

    constructor(
        private camera: Camera,
        private actionSheetController: ActionSheetController,
        private platform: Platform,
        private file: File,
        private filePath: FilePath,
        private storage: Storage,
        private webview: WebView) {

        this.cameraOptions = {
            quality: 50,
            sourceType: this.camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum: false,
            destinationType: this.camera.DestinationType.FILE_URI,
            correctOrientation: true,
            allowEdit: true,
            targetWidth: 300,
            targetHeight: 300,
        };
    }

    private pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return this.webview.convertFileSrc(img);
        }
    }

    takePicture() {
        return this.camera.getPicture(this.cameraOptions)
            .then(imagePath => {
                const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                return this.copyFileToLocalDir(correctPath, currentName, new Date().getTime() + '.jpeg');
            });
    }

    private copyFileToLocalDir(namePath, currentName, newFileName) {
        return this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {

            const localFilePath = this.file.dataDirectory + newFileName;
            const resPath = this.pathForImage(localFilePath);

            return {
                name: newFileName,
                path: resPath,
                filePath: localFilePath
            };

        }, error => {
            console.log('Error copying to local dir', error);
        });
    }


    resetPhotos() {
        this.storedImages = [];
    }

}
