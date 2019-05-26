import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ImageUploadService} from '../../../core/image-upload.service';

@Component({
  selector: 'app-submit-service',
  templateUrl: './submit-service.page.html',
  styleUrls: ['./submit-service.page.scss'],
})
export class SubmitServicePageComponent implements OnInit {
  static URL = 'services';
  pageTitle = 'Alta servico';
  submitFormService: FormGroup;
  storedImagesServices;
  isSubmitted = false;
  typeOfServices = ['ADIESTRADOR', 'PASEADOR', 'VETERINARIO'];

  constructor(private formBuild: FormBuilder, private imageUploadService: ImageUploadService) {
    // endpoint Country/{id}/regions
    // endpoint Professional types
  }

  ngOnInit() {
    this.submitFormService = this.formBuild.group({
      typeService: ['', [Validators.required]],
      otherService : [''],
      nameCompany: ['', [Validators.required]],
      nameService: ['', [Validators.required]],
      location: ['', [Validators.required]],
      region: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      description: ['']
    });
  }

  get fControls() {
    return this.submitFormService.controls;
  }

  onSubmit(submitAsociation) {
    console.log('Form Object', submitAsociation.value);
  }

  uploadPhoto() {
    this.imageUploadService.submitPhoto();
  }
}

