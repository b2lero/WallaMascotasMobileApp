import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActionSheetController} from '@ionic/angular';
import {PetService} from '../../../../services/pet.service';
import {IPet} from '../../../../models/pet.model';
import {ICountry} from '../../../../models/country.model';
import {CountryService} from '../../../../services/country.service';
import {IRegion} from '../../../../models/region.model';

@Component({
    selector: 'app-submit-pet',
    templateUrl: './submit-pet.page.html',
    styleUrls: ['./submit-pet.page.scss'],
})
export class SubmitPetPage implements OnInit {

    static URL = 'pets';
    pageTitle = 'Alta Mascota';
    countries: ICountry[];
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

    constructor(
        private formBuilder: FormBuilder,
        private petService: PetService,
        public actionSheetController: ActionSheetController,
        private countryService: CountryService
    ) {
        this.countryService.readAllcountries().subscribe(
            countries => {
                this.countries = countries;
            }
        );
    }

    ngOnInit() {
        this.submitPetForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            type: [''],
            breed: [''],
            country: [''],
            region: [''],
            location: ['', [Validators.required]],
            description: [''],
            gender: [''],
            size: [''],
            birthdate: [''],
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


    onSubmit(submitFormPet: FormGroup) {
        this.isSubmitted = true;
        const newPet: IPet = submitFormPet.value;
        if (newPet && this.submitPetForm.valid) {
            this.petService.createPet(newPet).subscribe(
                success => console.log('--> Success pet submitted', success)
            );
        }
    }

    loadPictures(imagesTakenFromPhone: string[]) {
        this.imagesFromPhone = imagesTakenFromPhone;
    }

    getRegionsByCountry(event) {
        const countryId = event.detail.value;
        this.countryService.readRegionById(countryId).subscribe(
            regions => {
                this.regions = regions;
            }
        );
    }
}
