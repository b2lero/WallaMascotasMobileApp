import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

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
    console.log(submitFormPet);
  }

}
