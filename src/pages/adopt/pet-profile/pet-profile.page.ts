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
        name: null, type: null, age: null, description: null, region: null, breed: null, location: null
    };

    constructor(private router: ActivatedRoute, private petservice: PetService) {}

    ngOnInit() {
        this.dogId = this.router.snapshot.paramMap.get('id');
        console.log('id ===', this.dogId);
        this.petservice.readPetById(this.dogId).subscribe(
            (pet: IPet) => {
                console.log('--> pet by id ', pet);
                // this.pet = pet;
            }
        );

        this.pet = {
            name: 'Rufi',
            type: {name: 'dog'},
            breed: 'Salchicha',
            pictures: [{url: '../../assets/imgs/dog_1.jpg'}],
            region: {name: 'Guadalajara', country: {code: '3333', name: 'España'}},
            description: 'Rufi es una chiquitina muy cariñosa y apegada. Convive con otros perros en su casa de acogida',
            age: 10,
            user: {name: 'Joel', surname: 'Montoya', mail: 'petthis@mail.com', phones: [{countryCode: '453', number: '640-686-958'}]},
            creationUtcDateTime: new Date()
        };

        // TODO /pets/{id} endpoint doesnt work
        // TODO create mock pet profile
    }

}
