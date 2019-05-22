import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PetService} from '../../../services/pet.service';
import {IPet} from '../../../models/pet.model';
import {HttpService} from '../../../core/http.service';

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

  constructor(private formBuilder: FormBuilder, private petService: PetService, private httpService: HttpService) { }

  get fControls() {
    return this.submitPetForm.controls;
  }

  ngOnInit() {
    this.submitPetForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      breed: ['', [Validators.required]],
      country: ['', [Validators.required]],
      region: ['', [Validators.required]],
      description: ['',[Validators.required]],
      gender: ['', [Validators.required]],
      size: ['',[Validators.required]],
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
