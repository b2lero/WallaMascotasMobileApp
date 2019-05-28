import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfessionalServService} from '../../../../services/professional-serv.service';
import {PetService} from '../../../../services/pet.service';

@Component({
    selector: 'app-submit-service',
    templateUrl: './submit-service.page.html',
    styleUrls: ['./submit-service.page.scss'],
})
export class SubmitServicePageComponent implements OnInit {
    static URL = 'services';
    pageTitle = 'Alta servico';
    submitFormService: FormGroup;
    isSubmitted = false;
    typeOfServices = ['ADIESTRADOR', 'PASEADOR', 'VETERINARIO'];
    imagesFromPhone = [];
    countriesAvailable = [];

    constructor(private formBuild: FormBuilder, private professionalService: ProfessionalServService,
                private petService: PetService) {
    }

    ngOnInit() {
        this.submitFormService = this.formBuild.group({
            typeService: ['', [Validators.required]],
            otherService: [''],
            nameCompany: ['', [Validators.required]],
            nameService: ['', [Validators.required]],
            location: ['', [Validators.required]],
            region: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required]],
            description: ['']
        });
        // this.professionalService.readAllProfessionalServicesTypes().subscribe(
        //   data => {
        //       this.typeOfServices = data;
        //   }
        // );
        // this.petService.readAllcountries().subscribe(
        //   data => {
        //       this.countriesAvailable = data;
        //   }
        // );x
    }

    get fControls() {
        return this.submitFormService.controls;
    }

    onSubmit(submitService) {
        console.log('Form Object', submitService.value);
        const newService = submitService.value;
        this.professionalService.createProfessionalService(newService).subscribe(
            success => console.log('SERVICE CREATED')
        );
    }

    loadPictures(imagesTakenFromPhone: string[]) {
        this.imagesFromPhone = imagesTakenFromPhone;
    }
}

