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

    // POST /pets
    readAllPets(): Observable<IPet[]> {
        const pageDefault = {page: 1, pageSize: 10};
        return this.httpService.post(ApiEndpoint.PETS_PAGES, pageDefault).pipe(map( result => result.pets));
    }

    // GET /pets/:id
    readPetById(id: string): Observable<IPet> {
        return this.httpService.get(ApiEndpoint.PETS + '/' + id);
    }

    // GET /countries
    readAllcountries() {
        return this.httpService.get(ApiEndpoint.COUNTRIES);
    }
}
