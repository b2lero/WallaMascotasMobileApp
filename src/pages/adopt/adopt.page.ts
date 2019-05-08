import {Component, OnInit} from '@angular/core';
import {IPet} from '../../models/pet.model';
import {PetService} from '../../services/pet.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-adopt',
    templateUrl: './adopt.page.html',
    styleUrls: ['./adopt.page.scss'],
})
export class AdoptPageComponent implements OnInit {

    static URL = 'adopt';
    private pageTitle = 'Adoptar una mascota';
    private animals: IPet[] = [];
    private mockPets: IPet[] = [];

    ngOnInit(): void {
        console.log('--> Seeding Mock Data');
        this.seedWithLookAlikeData();
    }

    constructor(private petService: PetService, private router: Router) {
        console.log(' 1 --> Loading Adopt Page');
        this.petService.readAllPets().subscribe(
            (data: IPet[]) => {
                this.animals = data.length === 0 ? this.mockPets : data;
            }
        );
    }

    private seedWithLookAlikeData() {
        const mockPets = [];
        for (let i = 0; i < 6; i++) {
            mockPets.push(
                {
                    id: i,
                    name: 'Plouf' + i,
                    breed: 'Pitbull',
                    description: 'This is content, without any paragraph or header tags,\n' +
                        '    within an ion-card-content element.',
                    age: 10 + i,
                    region: {name: 'Granada', country: {name: 'Spain'}},
                    pictureUrl: {url: '../../assets/imgs/dog_1.jpg'}
                }
            );
        }
        this.mockPets = mockPets;
    }
}

// TODO
// Agregar filtros busqueda mascotas
