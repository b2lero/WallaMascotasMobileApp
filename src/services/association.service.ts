import { Injectable } from '@angular/core';
import {HttpService} from '../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Observable} from 'rxjs';

@Injectable()
export class AssociationService {

    constructor(private httpService: HttpService) {
    }

    createAssociation(requestBody: object): Observable<any> {
        return this.httpService.post(ApiEndpoint.ASSOCIATIONS, requestBody);
    }

    

}
