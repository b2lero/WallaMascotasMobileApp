import { Injectable } from '@angular/core';
import {HttpService} from '../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Observable} from 'rxjs';
import {IPet} from '../models/pet.model';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

interface DogsApiImages {
    message: Array<string>;
}

@Injectable()
export class PetService {

    // Dogs API Images
    private apiDogsImages = 'https://dog.ceo/api/breeds/image/random/5';

    constructor(private httpService: HttpService) {
    }

    // Only Development
    // getDogsImages(): Observable<any> {
    //     return this.http.get<DogsApiImages>(this.apiDogsImages).pipe(map( x => x.message));
    // }

    // GET /pets
    readAllPets(): Observable<IPet[]> {
        return this.httpService.get(ApiEndpoint.PETS).pipe(map( result => result.pets));
    }

    // GET /countries
    readAllcountries() {
        return this.httpService.get(ApiEndpoint.COUNTRIES);
    }
}
