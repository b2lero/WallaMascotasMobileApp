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
    contactsPet;

    constructor(private router: ActivatedRoute, private petservice: PetService) {
    }

    ionViewWillEnter() {
        this.petId = this.router.snapshot.paramMap.get('id');
        // API IN CONSTRUCTION, has to be changed when rebuild is done
        // this.petservice.readContactInfoPetById(this.petId).subscribe(
        //     result => this.contactsPet
        // );
        this.petservice.readPetById(this.petId).subscribe(
            (pet: IPet) => {
                this.profile = pet;
            }
        );
    }

}
