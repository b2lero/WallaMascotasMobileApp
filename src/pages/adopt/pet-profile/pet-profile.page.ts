import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IPet} from '../../../models/pet.model';
import {PetService} from '../../../services/pet.service';

@Component({
    selector: 'app-pet-profile',
    templateUrl: './pet-profile.page.html',
    styleUrls: ['./pet-profile.page.scss'],
})

export class PetProfilePageComponent implements OnInit {

    static URL = ':id';
    private dogId: string;
    private pet: IPet = {
        name: null, age: null, description: null, region: null, breed: null, location: null
    };

    constructor(private router: ActivatedRoute, private petservice: PetService) {
        this.dogId = this.router.snapshot.paramMap.get('id');
        console.log('id ===', this.dogId);
        this.petservice.readPetById(this.dogId).subscribe(
            (pet: IPet) => {
                console.log('--> pet by id ', pet);
                this.pet = pet;
            }
        );
    }


    ngOnInit() {
        // TODO /pets/{id} endpoint doesnt work
        // TODO create mock pet profile
    }

}
