import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActionSheetController} from '@ionic/angular';
import {PetService} from '../../../../services/pet.service';
import {ICountry} from '../../../../models/country.model';
import {CountryService} from '../../../../services/country.service';
import {IRegion} from '../../../../models/region.model';
import {CameraService} from '../../../../services/camera.service';
import {PetRequestModel} from '../../../../models/pet-request.model';
import {ISizesPets} from '../../../../models/sizes-pets.model';
import {fromPromise} from 'rxjs/internal-compatibility';

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
    regions: IRegion[];
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
    imagesFromPhone = [];
    images64Pets = [];
    private isPhotos = false;

    constructor(
        private formBuilder: FormBuilder,
        private petService: PetService,
        public actionSheetController: ActionSheetController,
        private countryService: CountryService,
        private cameraService: CameraService,
        private changeRef: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.submitPetForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            type: [''],
            breed: [''],
            country: [''],
            region: [''],
            location: ['', [Validators.required]],
            description: ['', [Validators.required]],
            IsFemale: [''],
            size: [''],
            birthdate: [''],
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
    }

    ionViewDidEnter() {
        // this.changeRef.detectChanges();
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

    uploadPhoto() {
        fromPromise(this.cameraService.takePicture()).subscribe(
            res => {
                // @ts-ignore
                this.imagesFromPhone = res;
            }
        );
    }

    loadPicturesFromCameraSource() {
        this.cameraService.imagesTaken.asObservable().subscribe(
            res => {
                this.imagesFromPhone = res;
                if (this.imagesFromPhone.length > 0) {
                    this.isPhotos = true;
                }
            }
        );
    }

    onSubmit(submitFormPet: FormGroup) {
        this.isSubmitted = true;
        const newPet: PetRequestModel = submitFormPet.value;
        this.images64Pets = this.imagesFromPhone.map(
            x => {
                console.log(x);
                this.cameraService.formatImg64(x).then(
                    res => console.log('from submit form', res)
                );
            }
        );
        console.log('images processed', this.images64Pets);
        newPet.base64Pictures = this.images64Pets;

        // if (newPet && this.submitPetForm.valid) {
        //     this.petService.createPet(newPet).subscribe(
        //         success => console.log('--> Success pet submitted', success)
        //     );
        // }
    }


    ionViewDidLeave() {
        this.cameraService.resetPhotos();
    }

}
