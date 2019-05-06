import { Injectable } from '@angular/core';
import {HttpService} from '../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';

@Injectable()
export class PetService {

    constructor(private httpService: HttpService) {
    }

    readAllPets() {
        return this.httpService.get('/pets');
    }
}
