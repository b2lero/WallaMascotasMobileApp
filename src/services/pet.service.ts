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
    // Todo GET /pets/:id

    // GET /pets
    readAllPets(): Observable<IPet[]> {
        return this.httpService.get(ApiEndpoint.PETS).pipe(map( result => result.pets));
    }

    // GET /countries
    readAllcountries() {
        return this.httpService.get(ApiEndpoint.COUNTRIES);
    }
}
