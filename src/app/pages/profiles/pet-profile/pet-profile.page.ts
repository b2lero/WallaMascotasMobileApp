import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PetService} from '../../../../services/pet.service';
import {IPet} from '../../../../models/pet.model';

@Component({
    selector: 'app-pet-profile',
    templateUrl: './pet-profile.page.html',
    styleUrls: ['./pet-profile.page.scss'],
})

export class PetProfilePage {

    petId: string;
    profile: IPet;
    sliderOpts;

    constructor(private router: ActivatedRoute, private petservice: PetService) {
    }

    ionViewWillEnter() {
        this.petId = this.router.snapshot.paramMap.get('id');
        this.petservice.readPetById(this.petId).subscribe(
            (pet: IPet) => {
                console.log(pet);
                this.profile = pet;
            }
        );
    }


 }
