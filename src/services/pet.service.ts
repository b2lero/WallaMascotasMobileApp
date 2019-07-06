import { Injectable } from '@angular/core';
import {HttpService} from '../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Observable} from 'rxjs';
import {IPet} from '../models/pet.model';
import {IPetCategory} from '../models/pet-category.model';
import {PetRequestModel} from '../models/pet-request.model';
import {ISizesPets} from '../models/sizes-pets.model';
import {ITypesPets} from '../models/pet-types.model';

@Injectable()
export class PetService {

    constructor(private httpService: HttpService) {
    }

    // POST /pets/pages
    readAllPets(requestBody: object): Observable<any> {
        return this.httpService.post(ApiEndpoint.PETS_PAGES, requestBody);
    }
    // GET /pets/:id
    readPetById(id: string): Observable<IPet> {
        return this.httpService.get(ApiEndpoint.PETS + '/' + id);
    }

    // POST /pets
    createPet(pet: PetRequestModel): Observable<IPet> {
        console.log(pet);
        return this.httpService.successful('Pet Submitted').post(ApiEndpoint.PETS, JSON.stringify(pet));
    }

    readPetCategories(): Observable<IPetCategory[]> {
        return this.httpService.get(ApiEndpoint.PETS_CATEGORIES);
    }

    readPetSizes(): Observable<ISizesPets[]> {
        return this.httpService.get(ApiEndpoint.PETS_SIZES);
    }

    readPetTypes(): Observable<ITypesPets[]> {
        return this.httpService.get(ApiEndpoint.PETS_TYPES);
    }

    notificationSuccessful() {
        this.httpService.presentToast('Pet Submitted', 1000);
    }

    readContactInfoPetById(id: string) {
        return this.httpService.get(ApiEndpoint.PETS + '/' + id + ApiEndpoint.PET_CONTACTS_INFO);
    }

    putPetById(id: number, body) {
        return this.httpService.put(ApiEndpoint.PETS + id, body);
    }
}
