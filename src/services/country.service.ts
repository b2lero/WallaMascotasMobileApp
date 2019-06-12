import {Injectable} from '@angular/core';
import {HttpService} from '../core/http.service';
import {Observable} from 'rxjs';
import {ICountry} from '../models/country.model';
import {ApiEndpoint} from '../shared/api-endpoint.model';

@Injectable()
export class CountryService {
    constructor(private httpService: HttpService) {
    }

    // GET /countries
    readAllcountries(): Observable<ICountry[]> {
        return this.httpService.get(ApiEndpoint.COUNTRIES);
    }

    // GET /countries/:id/regions
    readRegionById(id) {
        return this.httpService.get(ApiEndpoint.COUNTRIES + '/' + id + '/regions');
    }

}
