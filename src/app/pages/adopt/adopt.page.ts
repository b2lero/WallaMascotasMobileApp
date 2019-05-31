import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {IonInfiniteScroll} from '@ionic/angular';
import {Subject} from 'rxjs';
import {PetService} from '../../../services/pet.service';
import {IPet} from '../../../models/pet.model';

@Component({
    selector: 'app-adopt',
    templateUrl: './adopt.page.html',
    styleUrls: ['./adopt.page.scss'],
})
export class AdoptPage implements OnInit {

    static URL = 'pets';
    pageTitle = 'Adoptar una mascota';
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    animals: IPet[] = [];
    currentPage = 1;
    PAGE_SIZE = 10;
    request = {page: this.currentPage, pageSize: this.PAGE_SIZE};
    categorySelected: string;


    constructor(private petService: PetService, private router: Router) {
    }

    ngOnInit(): void {
    }

    loadMorePets() {
        // Change state on each call from 'Loading' to 'Enable
        this.infiniteScroll.complete();
        const request = {page: this.currentPage, pageSize: this.PAGE_SIZE};
        this.petService.readAllPets(request).subscribe(
            (result) => {
                setTimeout(() => {
                    console.log(result);
                    const pets = this.animals;
                    const newPets = result.pets;
                    if (newPets.length > 0) {
                        this.animals = pets.concat(newPets);
                        this.currentPage += 1;
                    } else {
                        // All data loaded
                        this.infiniteScroll.disabled = true;
                    }
                    console.log('Array Pets size', this.animals.length);
                }, 50);
            }
        );
    }

    resetOptions() {
        this.currentPage = 1;
        this.infiniteScroll.disabled = false;
        // this.animals = [];
    }

    loadContentBasedOnCategory(event) {
        this.resetOptions();
        this.categorySelected = event.detail.value;
        console.log('--> selected category', this.categorySelected);
        const request = {page: this.currentPage, pageSize: this.PAGE_SIZE, category: this.categorySelected};
        this.petService.readAllPets(request).subscribe(
            result => {
                // update list pets with new category;
                console.log('log from loadContentBased...', result);
                this.animals = result.pets;
                this.currentPage += 1;
            },
            () => {},
            () => {
                // this.resetOptions();
                console.log('State for next request', this.currentPage);
            }
        );
    }
}


