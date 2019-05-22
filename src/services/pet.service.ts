import { Injectable } from '@angular/core';
import {HttpService} from '../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Observable} from 'rxjs';
import {IPet} from '../models/pet.model';
import {map} from 'rxjs/operators';

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
    createPet(pet: IPet) {
        return this.httpService.successful('Pet Successfully Submitted').post(ApiEndpoint.PETS, pet);
    }

    // GET /countries
    readAllcountries() {
        return this.httpService.get(ApiEndpoint.COUNTRIES);
    }
}
