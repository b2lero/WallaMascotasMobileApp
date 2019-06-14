import { Injectable } from '@angular/core';
import {HttpService} from '../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Observable} from 'rxjs';
import {IPet} from '../models/pet.model';
import {IPetCategory} from '../models/pet-category.model';
import {ICountry} from '../models/country.model';
import {PetRequestModel} from '../models/pet-request.model';
import {ISizesPets} from '../models/sizes-pets.model';

@Injectable()
export class PetService {

    constructor(private httpService: HttpService) {
    }

    // Todo GET /pets by category

    // POST /pets/pages
    readAllPets(requestBody: object): Observable<any> {
        return this.httpService.post(ApiEndpoint.PETS_PAGES, requestBody);
    }
    // GET /pets/:id
    readPetById(id: string): Observable<IPet> {
        return this.httpService.get(ApiEndpoint.PETS + '/' + id);
    }

    // POST /pets
    createPet(pet: PetRequestModel) {
        return this.httpService.successful('Pet Successfully Submitted').post(ApiEndpoint.PETS, pet);
    }

    readPetCategories(): Observable<IPetCategory[]> {
        return this.httpService.get(ApiEndpoint.PETS_CATEGORIES);
    }

    readPetSizes(): Observable<ISizesPets[]> {
        return this.httpService.get(ApiEndpoint.PETS_SIZES);
    }
}
