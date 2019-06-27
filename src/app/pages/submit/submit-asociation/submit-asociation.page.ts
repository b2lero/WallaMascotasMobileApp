import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActionSheetController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AssociationService} from '../../../../services/association.service';
import {CameraService} from '../../../../services/camera.service';
import {CountryService} from '../../../../services/country.service';
import {ICountry} from '../../../../models/country.model';
import {IRegion} from '../../../../models/region.model';

@Component({
    selector: 'app-submit-asociation',
    templateUrl: './submit-asociation.page.html',
    styleUrls: ['./submit-asociation.page.scss'],
})
export class SubmitAsociationPage implements OnInit {

    static URL = 'asociation';
    pageTitle = 'Alta asociacion';
    submitAsociation: FormGroup;
    associationsTypes = [];
    isSubmitted = false;
    countries: ICountry[];
    regions: IRegion[];
    typeAsociations = ['Asociacion', 'Casa de Acogida', 'Hogar Temporal', 'Otros'];
    typeShippings = ['No se realizan', 'Misma provincia', 'Toda España', 'Toda Europa'];
    imagesFromPhone = [];

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private associationService: AssociationService,
                public actionSheetController: ActionSheetController,
                private cameraService: CameraService,
                private countryService: CountryService) {
    }

    ngOnInit() {
        this.submitAsociation = this.formBuilder.group({
            name: ['', Validators.required],
            location: ['', Validators.required],
            regionId: [''],
            websiteUrl: [''],
            associationTypeId: [''],
            shippingTypeId: [''],
            email: ['', Validators.required],
        });

        this.countryService.readAllcountries().subscribe(
            countries => {
                this.countries = countries;
            }
        );

        this.associationService.readAssociationTypes().subscribe(
            result => {
                this.typeAsociations = result;
            }
        );

        this.associationService.readShippingTypes().subscribe(
            res => {
                this.typeShippings = res;
            }
        );
    }

    getRegionsByCountry(event) {
        const countryId = event.detail.value;
        this.countryService.readRegionById(countryId).subscribe(
            regions => {
                this.regions = regions;
            }
        );
    }

    get fControls() {
        return this.submitAsociation.controls;
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

    // submitPhoto() {
    //     this.cameraService.submitPhoto().then( result => {
    //         console.log('launch camera');
    //         this.cameraService.imagesLinksStorage.asObservable().subscribe(
    //             data => {
    //                 console.log('retrieving photos');
    //                 this.imagesFromPhone = data;
    //             }
    //         );
    //     });
    // }
}
