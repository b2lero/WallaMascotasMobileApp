import {Component, OnInit, ViewChild} from '@angular/core';
import {IPet} from '../../models/pet.model';
import {PetService} from '../../services/pet.service';
import {Router} from '@angular/router';
import {IonInfiniteScroll} from '@ionic/angular';

@Component({
    selector: 'app-adopt',
    templateUrl: './adopt.page.html',
    styleUrls: ['./adopt.page.scss'],
})
export class AdoptPageComponent implements OnInit {

    static URL = 'pets';
    pageTitle = 'Adoptar una mascota';
    animals: IPet[] = [];
    currentPage = 1;
    PAGE_SIZE = 10;
    request = {page: this.currentPage, pageSize: this.PAGE_SIZE};
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


    constructor(private petService: PetService, private router: Router) {
    }

    ngOnInit(): void {
        this.petService.readAllPets(this.request).subscribe(
            result => {
                this.animals = result.pets;
                this.currentPage += 1;
            }
        );

    }



    loadPets(e) {
        e.target.complete();
        const request = {page: this.currentPage, pageSize: this.PAGE_SIZE};
        this.petService.readAllPets(request).subscribe(
            (result) => {
                console.log(result);
                const pets = this.animals;
                const newPets = result.pets;
                if (newPets.length > 0) {
                    this.animals = pets.concat(newPets);
                    this.currentPage += 1;
                } else {
                    // All data loaded
                    e.target.disable = true;
                    this.infiniteScroll.disabled = true;
                }
                console.log('Array Pets size', this.animals.length);
            }
        );
    }


    private updateContentPets(e) {
        const idSelectedElm = e.detail.value;
        console.log('--> Filter selected: ', idSelectedElm);
        this.animals.map(
          x => console.log(x)
        );
    }
}


