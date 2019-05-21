import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IPet} from '../../../models/pet.model';
import {PetService} from '../../../services/pet.service';

@Component({
    selector: 'app-pet-profile',
    templateUrl: './pet-profile.page.html',
    styleUrls: ['./pet-profile.page.scss'],
})

export class PetProfilePageComponent{

    static URL = ':id';
    dogId: string;
    pet: IPet;
    sliderOpts;

    constructor(private router: ActivatedRoute, private petservice: PetService) {
        this.dogId = this.router.snapshot.paramMap.get('id');
        this.petservice.readPetById(this.dogId).subscribe(
            (pet: IPet) => {
                this.pet = pet;
            }
        );
    }


 }
