import {Component, OnInit} from '@angular/core';
import {IPet} from '../../models/pet.model';
import {PetService} from '../../services/pet.service';
import {Router} from '@angular/router';
import {HttpService} from '../../core/http.service';

@Component({
    selector: 'app-adopt',
    templateUrl: './adopt.page.html',
    styleUrls: ['./adopt.page.scss'],
})
export class AdoptPageComponent implements OnInit {

    static URL = 'pets';
    private pageTitle = 'Adoptar una mascota';
    private animals: IPet[] = [];
    // private mockPets: IPet[] = [];

    constructor(private petService: PetService, private router: Router, private authtentication: HttpService) {
        console.log('--> Loading Adopt Page');
        this.petService.readAllPets().subscribe(
            (petsList: IPet[]) => {
                console.log('--> Content of petsList');
                console.log(petsList[0]);
                this.animals = petsList;
            }
        );
    }

    ngOnInit(): void {
    }

    private updateContentPets(e) {
        const idSelectedElm = e.detail.value;
        // TODO  Filter Content by Category: dogs, cats, others
    }



}

// TODO
// Agregar filtros busqueda mascotas
