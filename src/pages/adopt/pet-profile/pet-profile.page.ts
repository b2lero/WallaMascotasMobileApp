import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IPet} from '../../../models/pet.model';
import {PetService} from '../../../services/pet.service';
import {IonDatetime} from '@ionic/angular';

@Component({
    selector: 'app-pet-profile',
    templateUrl: './pet-profile.page.html',
    styleUrls: ['./pet-profile.page.scss'],
})

export class PetProfilePageComponent implements OnInit {

    static URL = 'pet/:id';
    private dogId: string;
    private pet: IPet;

    constructor(private router: ActivatedRoute, private petservice: PetService) {
        this.dogId = this.router.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.pet = {
            name: 'Rufi',
            breed: 'Salchicha',
            pictureUrl: {url: '../../assets/imgs/dog_1.jpg'},
            region: {name: 'Guadalajara', country: {code: '3333', name: 'España'}},
            description: 'Rufi es una chiquitina muy cariñosa y apegada. Convive con otros perros en su casa de acogida',
            age: 10,
            user: {name: 'Joel', surname: 'Montoya', mail: 'petthis@mail.com', phones: [{countryCode: '453', number: '640-686-958'}]},
            creationUtcDateTime: new Date()
        };
    }

}
