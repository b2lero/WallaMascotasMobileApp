import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActionSheetController} from '@ionic/angular';
import {File} from '@ionic-native/File/ngx';
import {PetService} from '../../../../services/pet.service';
import {ICountry} from '../../../../models/country.model';
import {CountryService} from '../../../../services/country.service';
import {IRegion} from '../../../../models/region.model';
import {CameraService} from '../../../../services/camera.service';
import {PetRequestModel} from '../../../../models/pet-request.model';
import {ISizesPets} from '../../../../models/sizes-pets.model';
import {fromPromise} from 'rxjs/internal-compatibility';
import {FileEntry} from '@ionic-native/file/ngx';
import {ITypesPets} from '../../../../models/pet-types.model';
import {IPetCategory} from '../../../../models/pet-category.model';
import {Base64Picture} from '../../../../models/base64.model';

@Component({
    selector: 'app-submit-pet',
    templateUrl: './submit-pet.page.html',
    styleUrls: ['./submit-pet.page.scss'],
})
export class SubmitPetPage implements OnInit {

    static URL = 'pets';
    pageTitle = 'Alta Mascota';
    countries: ICountry[];
    sizesPets: ISizesPets [];
    img64: Base64Picture = {fileName: null, base64String: null};
    petCategories: IPetCategory[];
    regions: IRegion[];
    submitPetForm: FormGroup;
    typeAnimals: ITypesPets[];
    isSubmitted = false;
    newPet: PetRequestModel;
    // Checkbox form values
    hasChip = false;
    isFemale = true;
    isVaccinated = false;
    isPositiveInLeukemia = false;
    isPositiveInLeismania = false;
    hasPppLicense = false;
    isSterilized = false;
    isInTreatment = false;
    isPositiveInFelineImmunodeficiency = false;
    // Photos Storage
    imagesFromPhone = [];
    private isPhotos = false;

    constructor(
        private formBuilder: FormBuilder,
        private petService: PetService,
        public actionSheetController: ActionSheetController,
        private countryService: CountryService,
        private cameraService: CameraService,
        private changeRef: ChangeDetectorRef,
        private file: File
    ) {
    }

    ngOnInit() {
        this.submitPetForm = this.formBuilder.group({
            name: [''],
            petTypeId: [''],
            petCategoryId: [''],
            regionId: [''],
            breed: [''],
            location: [''],
            description: [''],
            isFemale: [''],
            petSizeId: [''],
            birthDate: [''],
            hasChip: [''],
            isVaccinated: [''],
            isPositiveInLeukemia: [''],
            isPositiveInLeismania: [''],
            hasPppLicense: [''],
            isSterilized: [''],
            isInTreatment: [''],
            isPositiveInFelineImmunodeficiency: [''],
        });

        this.countryService.readAllcountries().subscribe(
            countries => {
                this.countries = countries;
            }
        );

        this.petService.readPetSizes().subscribe(
            result => {
                this.sizesPets = result;
            }
        );

        this.petService.readPetTypes().subscribe(
            result => {
                this.typeAnimals = result;
            }
        );

        this.petService.readPetCategories().subscribe(
            result => {
                this.petCategories = result;
            }
        );
    }

    get fControls() {
        return this.submitPetForm.controls;
    }

    getRegionsByCountry(event) {
        const countryId = event.detail.value;
        this.countryService.readRegionById(countryId).subscribe(
            regions => {
                this.regions = regions;
            }
        );
    }

    launchCameraService() {
        fromPromise(this.cameraService.takePicture()).subscribe(
            res => {
                this.imagesFromPhone.unshift(res);
            }
        );
    }

    formatImg64(imgEntry: any[]) {
        const imgsFormatted: Base64Picture[] = [];
        for (const img of imgEntry) {
            fromPromise(this.file.resolveLocalFilesystemUrl(img.filePath)).subscribe(
                entry => {
                    console.log(entry);
                    (entry as FileEntry).file(resultFile => {
                        const reader = new FileReader();
                        reader.readAsDataURL(resultFile);
                        reader.onloadend = () => {
                            this.img64.fileName = resultFile.name;
                            this.img64.base64String = reader.result.toString();
                            imgsFormatted.push(this.img64);
                        };
                    });
                }
            );
        }
        return imgsFormatted;
    }

    onSubmit(submitFormPet) {
        this.isSubmitted = true;
        if (this.submitPetForm.valid) {
            this.newPet = submitFormPet.value;
            this.newPet.isFemale = true;
            this.newPet.petCategoryId = 2;
            this.newPet.regionId = 2;
            this.newPet.petTypeId = 2;
            this.newPet.longitude = 0;
            this.newPet.latitude = 0;
            this.newPet.birthDate = new Date();
            this.newPet.location = 'somewhere';
            this.newPet.base64Pictures = [];
            this.newPet.publicationStatusId = 2;
            const imgs64 = this.formatImg64(this.imagesFromPhone);
            this.newPet.base64Pictures = imgs64;
            // const img64646 = [{
            //     'fileName': 'f1387510-9124-11e9-a582-bf4d7075e4aa.jpeg',
            //     'base64String': 'data:image/jpeg;base64,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'
            // }];
            // this.formatImg64(this.imagesFromPhone);
            //this.newPet.base64Pictures.push(this.img64);

            this.petService.createPet(this.newPet).subscribe(
                result => {
                    console.log('Pet submitted', result);
                    this.isSubmitted = !this.isSubmitted;
                }, (err) => {
                    console.log('error submitting pet', err);
                }
            );

        }
    }

    ionViewDidLeave() {
        this.cameraService.resetPhotos();
        // this.newPet.base64Pictures = [];
    }

}
