import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-submit-asociation',
  templateUrl: './submit-asociation.page.html',
  styleUrls: ['./submit-asociation.page.scss'],
})
export class SubmitAsociationPageComponent implements OnInit {

  static URL = 'asociation';
  pageTitle = 'Alta asociacion';
  submitAsociation: FormGroup;
  isSubmitted = false;
  typeAsociations = ['Asociacion', 'Casa de Acogida', 'Hogar Temporal', 'Otros'];
  typeShippings = ['No se realizan', 'Misma provincia', 'Toda España', 'Toda Europa'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.submitAsociation = this.formBuilder.group({
      name: ['', [Validators.required]],
      TLF: ['', [Validators.required]],
      country: ['', [Validators.required]],
      region: ['', [Validators.required]],
      type: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required]],
      typeShipping: ['', [Validators.required]],
      web: ['']
    });
  }

  get fControls() {
    return this.submitAsociation.controls;
  }

  onSubmit(submitAsocForm) {
    console.log('form submitted');
    this.isSubmitted = true;
    const formData = submitAsocForm.value;

    console.log(formData);
  }
}
