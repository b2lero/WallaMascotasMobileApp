import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PetService} from '../../../services/pet.service';
import {ActionSheetController} from '@ionic/angular';
import {IPet} from '../../../models/pet.model';

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
    imagesFromPhone = [];

    constructor(
        private formBuilder: FormBuilder,
        private petService: PetService,
        public actionSheetController: ActionSheetController,
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
}
