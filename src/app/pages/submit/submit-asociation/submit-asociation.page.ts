import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActionSheetController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AssociationService} from '../../../../services/association.service';
import {CameraService} from '../../../../services/camera.service';
import {CountryService} from '../../../../services/country.service';
import {ICountry} from '../../../../models/country.model';
import {IRegion} from '../../../../models/region.model';
import {fromPromise} from 'rxjs/internal-compatibility';
import {File, FileEntry} from '@ionic-native/file/ngx';
import {Base64Picture} from '../../../../models/base64.model';
import {PetRequestModel} from '../../../../models/pet-request.model';
import {IAssociation} from '../../../../models/association.model';

@Component({
    selector: 'app-submit-asociation',
    templateUrl: './submit-asociation.page.html',
    styleUrls: ['./submit-asociation.page.scss'],
})
export class SubmitAsociationPage implements OnInit {

    static URL = 'asociation';
    pageTitle = 'Alta asociacion';
    submitAsociation: FormGroup;
    associationsTypes = [];
    isSubmitted = false;
    newAssociation: IAssociation = {};
    countries: ICountry[];
    regions: IRegion[];
    img64: Base64Picture = {fileName: null, base64String: null};
    imgs64Formatted: Base64Picture[] = [];
    imgsCameraWebFormat = [];
    typeAsociations = ['Asociacion', 'Casa de Acogida', 'Hogar Temporal', 'Otros'];
    typeShippings = ['No se realizan', 'Misma provincia', 'Toda España', 'Toda Europa'];
    imagesFromPhone = [];

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private associationService: AssociationService,
                public actionSheetController: ActionSheetController,
                private cameraService: CameraService,
                private countryService: CountryService,
                private file: File) {
    }

    ngOnInit() {
        this.submitAsociation = this.formBuilder.group({
            name: ['', Validators.required],
            location: ['', Validators.required],
            regionId: [''],
            websiteUrl: [''],
            associationTypeId: [''],
            shippingTypeId: [''],
            email: ['', Validators.required],
        });

        this.countryService.readAllcountries().subscribe(
            countries => {
                this.countries = countries;
            }
        );

        this.associationService.readAssociationTypes().subscribe(
            result => {
                this.typeAsociations = result;
            }
        );

        this.associationService.readShippingTypes().subscribe(
            res => {
                this.typeShippings = res;
            }
        );
    }

    getRegionsByCountry(event) {
        const countryId = event.detail.value;
        this.countryService.readRegionById(countryId).subscribe(
            regions => {
                this.regions = regions;
            }
        );
    }

    get fControls() {
        return this.submitAsociation.controls;
    }

    launchCameraService() {
        fromPromise(this.cameraService.takePicture()).subscribe(
            res => {
                console.log(res);
                this.imgsCameraWebFormat.unshift(res);
                this.formatToImg64(res);
            }
        );
    }

    launchPhotolibraryService() {
        fromPromise(this.cameraService.takePictureFromGallery()).subscribe(
            res => {
                this.imgsCameraWebFormat.unshift(res);
                this.formatToImg64(res);
            }
        );
    }


    formatToImg64(imgEntry) {
        fromPromise(this.file.resolveLocalFilesystemUrl(imgEntry.filePath)).subscribe(
            entry => {
                (entry as FileEntry).file(resultFile => {
                    const reader = new FileReader();
                    reader.readAsDataURL(resultFile);
                    reader.onloadend = () => {
                        this.img64.fileName = resultFile.name;
                        this.img64.base64String = reader.result.toString();
                        this.imgs64Formatted.push(this.img64);
                    };
                });
            }
        );
    }

    onSubmit(submitAsociation) {
        this.isSubmitted = true;
        if (this.submitAsociation.valid && this.imgs64Formatted.length > 0) {
            const newAsssoc: IAssociation = submitAsociation.value;
            this.newAssociation = {
                name: newAsssoc.name,
                location: newAsssoc.location,
                regionId: newAsssoc.regionId,
                websiteUrl: newAsssoc.websiteUrl,
                associationTypeId: newAsssoc.associationTypeId,
                shippingTypeId: newAsssoc.shippingTypeId,
                base64Pictures: this.imgs64Formatted
            };

            this.associationService.createAssociation(this.newAssociation).subscribe(
                result => {
                    console.log('Association submitted', result);
                    this.isSubmitted = !this.isSubmitted;
                    setTimeout(() => {
                        this.router.navigate(['home']);
                    }, 2000);
                }, (err) => {
                    console.log('error submitting pet', err);
                }
            );
        }
    }

    ionViewDidLeave() {
        this.cameraService.resetPhotos();
    }

    deletePicture(position) {
        this.imgs64Formatted.slice(position, 1);
        this.imgsCameraWebFormat.splice(position, 1);
    }
}
