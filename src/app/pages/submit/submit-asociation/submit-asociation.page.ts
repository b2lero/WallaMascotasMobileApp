import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActionSheetController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AssociationService} from '../../../../services/association.service';

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
    imagesFromPhone = [];

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private associationService: AssociationService,
                public actionSheetController: ActionSheetController) {
    }

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

    loadPictures(imagesTakenFromPhone: string[]) {
        this.imagesFromPhone = imagesTakenFromPhone;
    }

    onSubmit(submitAsocForm: FormGroup) {
        console.log('form submitted');
        this.isSubmitted = true;
        const newAssociation = submitAsocForm.value;

        if (this.submitAsociation.valid) {
            this.associationService.createAssociation(newAssociation).subscribe(
                res => console.log('Successs', res),
                (error) => console.log('Error submission', error)
            );
        }

    }
}
