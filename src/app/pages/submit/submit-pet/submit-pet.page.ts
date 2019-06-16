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
import {logger} from 'codelyzer/util/logger';

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
    petCategories: IPetCategory[];
    regions: IRegion[];
    submitPetForm: FormGroup;
    typeAnimals: ITypesPets[];
    isSubmitted = false;
    newPet: PetRequestModel;
    petSubmitModel: PetRequestModel = {
        name: '',
        location: '',

        latitude: 0,
        longitude: 0,

        isFemale: false,

        publicationStatusId: 2,

        petTypeId: 0,
        petCategoryId: 0,
        petSizeId: 0,
        regionId: 1,
        breed: '',
        description: '',
        birthDate: new Date(),
        isInTreatment: false,
        hasPppLicense: false,
        isSterilized: false,
        isPositiveInFelineImmunodeficiency: false,
        isPositiveInLeismania: false,
        isPositiveInLeukemia: false,
        hasChip: false,
        isVaccinated: false,
        base64Pictures: [],
    };
    // Checkbox form values
    hasChip = false;
    isVaccinated = false;
    isPositiveInLeukemia = false;
    isPositiveInLeismania = false;
    hasPppLicense = false;
    isSterilized = false;
    isInTreatment = false;
    isPositiveInFelineImmunodeficiency = false;
    // Photos Storage
    imagesFromPhone = [];
    images64Pets = [];
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
            name: ['', [Validators.required]],
            petTypeId: [''],
            petCategoryId: [''],
            countryId: [''],
            regionId: [''],
            breed: [''],
            location: ['', [Validators.required]],
            description: ['', [Validators.required]],
            IsFemale: [''],
            sizeId: [''],
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
                console.log(result);
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

    // formatImg64(imgEntry) {
    //     this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
    //         .then(entry => {
    //             (entry as FileEntry).file(file => {
    //                 const reader = new FileReader();
    //                 reader.onloadend = () => {
    //                     this.images64Pets.push({fileName: file.name, base64String: reader.result});
    //                 };
    //                 reader.readAsDataURL(file);
    //             });
    //         });
    // }

    onSubmit(submitFormPet: FormGroup) {
        this.isSubmitted = true;
        if (this.submitPetForm.valid) {
            console.log('got here');
            this.newPet = submitFormPet.value;
            this.newPet.longitude = 100;
            this.newPet.latitude = 100;
            this.newPet.publicationStatusId = 2;
            this.newPet.base64Pictures = [];

            this.imagesFromPhone.forEach(img => {
                this.file.resolveLocalFilesystemUrl(img.filePath)
                    .then(entry => {
                        (entry as FileEntry).file(file => {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                // @ts-ignore
                                this.newPet.base64Pictures.push({fileName: file.name, base64String: reader.result});
                            };
                            reader.readAsDataURL(file);
                        });
                    });
            });

            console.log('new pet body', this.newPet);

            this.petService.createPet(this.newPet).subscribe(
                result => {
                    console.log('Pet submitted', result);
                    this.isSubmitted = !this.isSubmitted;
                }
            );

        }
    }

    ionViewDidLeave() {
        this.cameraService.resetPhotos();
        this.newPet.base64Pictures = [];
    }

}
