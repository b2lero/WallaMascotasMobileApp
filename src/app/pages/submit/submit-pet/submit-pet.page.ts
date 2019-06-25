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
import {JsonArray, parseJson} from '@angular-devkit/core';
import {environment} from '../../../../environments/environment';

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
    imgs64Formatted: Base64Picture[] = [];
    petCategories: IPetCategory[];
    regions: IRegion[];
    submitPetForm: FormGroup;
    typeAnimals: ITypesPets[];
    isSubmitted = false;
    newPet: PetRequestModel = {};
    newPet2: PetRequestModel = {};
    // Checkbox form values
    hasChip = false;
    isFemale = true;
    isVaccinated = false;
    isPositiveInLeukemia: false;
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
            location: [''],
            isFemale: [''],
            petTypeId: [''],
            petCategoryId: [''],
            regionId: [''],
            countryId: [''],
            breed: [''],
            description: [''],
            petSizeId: [''],
            birthDate: [''],
            hasChip: [''],
            isVaccinated: [''],
            isPositiveInLeukemia: [''],
            isPositiveInLeismania: [''],
            hasPppLicense: [''],
            isSterilized: [''],
            isInTreatment: [''],
            isPositiveInFelineImmunodeficiency: ['']
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
                this.formatImg64(res);
            }
        );
    }

    formatImg64(imgEntry) {
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

    onSubmit(submitFormPet) {
        this.isSubmitted = true;
        if (this.submitPetForm.valid) {
            const newPet: PetRequestModel = submitFormPet.value;

            this.newPet = {
                name: newPet.name,
                location: 0,
                latitude: 0,
                longitude: 0,
                isFemale: this.isFemale,
                publicationStatusId: 2,
                petTypeId: newPet.petTypeId,
                petCategoryId: newPet.petCategoryId,
                petSizeId: newPet.petSizeId,
                regionId: newPet.regionId,
                base64Pictures: this.imgs64Formatted,
                breed: newPet.breed,
                description: newPet.description,
                birthDate: new Date(),
                isInTreatment: this.isInTreatment,
                hasPppLicense: this.hasPppLicense,
                isSterilized: this.isSterilized,
                isPositiveInFelineImmunodeficiency: this.isPositiveInFelineImmunodeficiency,
                isPositiveInLeismania: this.isPositiveInLeismania,
                isPositiveInLeukemia: this.isPositiveInLeukemia,
                isVaccinated: this.isVaccinated
            };

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
