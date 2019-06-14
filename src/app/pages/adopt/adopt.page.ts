import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {IonInfiniteScroll} from '@ionic/angular';
import {PetService} from '../../../services/pet.service';
import {IPet} from '../../../models/pet.model';
import {IPetCategory} from '../../../models/pet-category.model';

@Component({
    selector: 'app-adopt',
    templateUrl: './adopt.page.html',
    styleUrls: ['./adopt.page.scss'],
})
export class AdoptPage {

    static URL = 'pets';
    pageTitle = 'Adoptar una mascota';
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    animals: IPet[] = [];
    currentPage = 1;
    PAGE_SIZE = 2;
    request = {page: this.currentPage, pageSize: this.PAGE_SIZE, petCategoryIds: ['1']};
    categorySelected: string;
    categoriesPets: IPetCategory[];

    constructor(private petService: PetService, private router: Router) {
        this.petService.readAllPets(this.request).subscribe(
            result => {
                console.log(result);
                this.animals = result.pets;
                this.currentPage += 1;
            }
        );
    }

    ionViewWillEnter() {
        this.petService.readPetCategories().subscribe(
            result => {
                this.categoriesPets = result;
            }
        );
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
    }

    loadContentBasedOnCategory(event) {
        this.resetOptions();
        const categorySelected = [];
        categorySelected.push(event.detail.value);
        const request = {page: this.currentPage, pageSize: this.PAGE_SIZE, petCategoryIds: categorySelected};
        this.petService.readAllPets(request).subscribe(
            result => {
                // update list pets with new category;
                console.log('log from loadContentBased...', result);
                this.animals = result.pets;
                this.currentPage += 1;
            },
            () => {
            },
            () => {
                // this.resetOptions();
                console.log('State for next request', this.currentPage);
            }
        );
    }

    retrievePetCategoryID(categoryName) {
        let categorySelected;
        this.petService.readPetCategories().subscribe(
            result => {
                categorySelected = result.find((x) => x.name === categoryName);
                return categorySelected;
            }
        );
    }
}


